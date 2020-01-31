class Stripe::SubscriptionController < ApplicationController
  before_action :set_subscription, only: [:create, :update, :destroy]
  before_action :authenticate_user!, except: :webhook
  skip_before_action :verify_authenticity_token, only: :webhook

  # POST /subscription
  # Used to create a new subscription
  def create
    @stripe_session = Stripe::Checkout::Session.create(
      customer: current_user.stripe_id,
      payment_method_types: ['card'],
      subscription_data: { items: [{ plan: 'plan_GdMh40FZp0zoJ1' }] },
      client_reference_id: current_user.id,
      success_url: "#{edit_user_registration_url}?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: edit_user_registration_url
    )

    @publishable_key = stripe_publishable_key
  end

  # PUT /subscription
  # Used to update the user's payment information.
  def update
    @stripe_session = Stripe::Checkout::Session.create(
      client_reference_id: current_user.id,
      payment_method_types: ['card'],
      mode: 'setup',
      setup_intent_data: {
        metadata: {
          user_id: current_user.id,
          customer_id: current_user.stripe_id,
          subscription_id: @subscription.stripe_id
        }
      },
      success_url: "#{edit_user_registration_url}?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: edit_user_registration_url
    )
    @publishable_key = stripe_publishable_key
  end

  # DELETE /subscription
  # Immediately cancels the user's subscription.
  def destroy
    Stripe::Subscription.delete(@subscription.stripe_id)
  end

  def webhook
    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = nil

    begin
      event = Stripe::Webhook.construct_event(payload, sig_header, stripe_webhook_endpoint_secret)
    rescue JSON::ParserError
      logger.debug "JSON::ParserError in webhook."
      return head :bad_request
    rescue Stripe::SignatureVerificationError
      logger.debug "Stripe::SignatureVerificationError in webhook."
      return head :bad_request
    end

    case event.type
    when 'checkout.session.completed'
      checkout_session_completed(event)
    when 'customer.subscription.updated'
      customer_subscription_updated(event)
    when 'customer.subscription.deleted'
      customer_subscription_deleted(event)
    else
      logger.debug "Unhandled webhook event #{event.type}"
      return head :ok
    end

    head :ok
  end

  private

  def stripe_publishable_key
    if ENV.fetch('STRIPE_MODE', 'test') == 'live'
      return Rails.application.credentials.stripe[:live_publishable_key]
    end

    Rails.application.credentials.stripe[:test_publishable_key]
  end

  # returns the unique webhook signing secret (different per environment)
  def stripe_webhook_endpoint_secret
    ENV.fetch('STRIPE_WEBHOOK_SIGNING_SECRET')
  end

  # Hook fires when user completes checkout successfully.
  # This is used to update the user's payment method or reactivate a canceled subscription.
  def checkout_session_completed(event)
    logger.debug "checkout_session_completed webhook processing started."

    # retrieve the session
    session_object = event['data']['object']
    session = Stripe::Checkout::Session.retrieve(session_object['id'])
    logger.debug "retrieved session with mode #{session['mode']}"

    case session['mode']
    when 'setup'
      # retrieve the setup_intent
      setup_intent_id = session['setup_intent']
      setup_intent = Stripe::SetupIntent.retrieve(setup_intent_id)
      logger.debug "retrieved setup_intent"

      customer_id = setup_intent['metadata']['customer_id']
      subscription_id = setup_intent['metadata']['subscription_id']
      payment_method_id = setup_intent['payment_method']

      subscription = Stripe::Subscription.retrieve(subscription_id)
      logger.debug "retrieve subscription #{subscription_id}"

      # attach the new payment method to the customer
      Stripe::PaymentMethod.attach(payment_method_id, { customer: customer_id })
      logger.debug "attached new payment method to customer"
    when 'subscription'
      customer_id = session['customer']
      subscription_id = session['subscription']

      subscription = Stripe::Subscription.retrieve(subscription_id)
      logger.debug "retrieve subscription #{subscription_id}"

      payment_method_id = subscription['default_payment_method']
    else
      logger.debug "Unhandled mode #{session['mode']}"
      return head :ok
    end

    # Set the default payment method on their subscription
    Stripe::Subscription.update(subscription_id, { default_payment_method: payment_method_id })
    logger.debug "updated the subscription's default payment method"

    # Set the default payment method on the customer
    Stripe::Customer.update(
      customer_id,
      { invoice_settings: { default_payment_method: payment_method_id } }
    )
    logger.debug "updated the customer's default payment method"

    payment_method = Stripe::PaymentMethod.retrieve(payment_method_id)
    logger.debug "retrieved payment method"

    user = User.find(session['client_reference_id'])
    logger.debug "found user by with id #{session['client_reference_id']}"

    user.subscription.update!(stripe_id: subscription['id'], current_period_ends_at: Time.at(subscription['current_period_end']))
    user.subscription.update!(
      trial_starts_at: Time.at(subscription['trial_start']),
      trial_ends_at: Time.at(subscription['trial_end'])
    ) if subscription['status'] == 'trialing'

    logger.debug "updated the user subscription"

    user.subscription.active!
    logger.debug "user subscription status: #{user.subscription.status}"

    user.update(payment_method_id: payment_method_id,
                 payment_method_last4: payment_method['card']['last4'])
    logger.debug "updated the user payment method"

    head :ok
  ensure
    logger.debug "checkout_session_completed webhook processing completed."
  end

  # Hook fires when a stripe subscription is changed.
  def customer_subscription_updated(event)
    logger.debug "customer_subscription_updated event processing started"

    subscription_object = event['data']['object']
    logger.debug "subscription status is #{subscription_object['status']}"

    subscription = Subscription.find_by_stripe_id(subscription_object['id'])

    unless subscription.present?
      logger.debug "did not find a user subscription with stripe_id #{subscription_object['id']}"
      return head :ok
    end

    logger.debug "found user subscription to update with id #{subscription.id}"

    subscription.update!(current_period_ends_at: Time.at(subscription_object['current_period_end']))

    if subscription_object['status'] == 'trialing'
      subscription.update!(
        trial_starts_at: Time.at(subscription_object['trial_start']),
        trial_ends_at: Time.at(subscription_object['trial_end'])
      )
    end

    logger.debug "updated the user's subscription attributes"

    subscription.send("#{subscription_object['status']}!")
    logger.debug "user subscription status: #{subscription.status}"

    head :ok
  ensure
    logger.debug "customer_subscription_updated webhook processing completed."
  end

  # Hook fires when customer’s subscription is canceled immediately.
  def customer_subscription_deleted(event)
    logger.debug "customer_subscription_deleted webhook processing started."

    subscription_object = event['data']['object']
    subscription = Subscription.find_by_stripe_id(subscription_object['id'])

    unless subscription.present?
      logger.debug "did not find a user subscription with stripe_id #{subscription_object['id']}"
      return head :ok
    end

    logger.debug "found user subscription to cancel with id #{subscription.id}."
    subscription.canceled!
    UserMailer.subscription_canceled(subscription.user).deliver_later

    head :ok
  ensure
    logger.debug "customer_subscription_deleted webhook processing completed."
  end

  def set_subscription
    @subscription = Subscription.find_by_user_id(current_user.id)
  end

end
