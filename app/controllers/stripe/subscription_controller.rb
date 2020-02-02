class Stripe::SubscriptionController < ApplicationController
  before_action :set_subscription, only: [:update, :destroy]
  before_action :authenticate_user!, except: :webhook
  skip_before_action :verify_authenticity_token, only: :webhook

  # POST /subscription
  # Used to create a new subscription
  def create
    @stripe_session = Stripe::Checkout::Session.create(
      customer: current_user.stripe_id,
      payment_method_types: ['card'],
      subscription_data: { items: [{ plan: StripeHelpers::PLAN_ID }] },
      client_reference_id: current_user.id,
      success_url: "#{edit_user_registration_url}?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: edit_user_registration_url
    )
    @publishable_key = stripe_publishable_key
  rescue Stripe::InvalidRequestError => e
    raise e unless e.message.include?('No such customer')
    StripeHelpers.create_customer(current_user)
    retry
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
          subscription_id: current_user.subscription.stripe_id
        }
      },
      success_url: "#{edit_user_registration_url}?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: edit_user_registration_url
    )
    @publishable_key = stripe_publishable_key
  rescue Stripe::InvalidRequestError => e
    raise e unless e.message.include?('No such customer')
    StripeHelpers.create_customer(current_user)
    retry
  end

  # DELETE /subscription
  # Immediately cancels the user's subscription.
  def destroy
    StripeHelpers.cancel_subscription(@subscription.stripe_id)
  end

  def webhook
    payload = request.body.read
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    webhook_signing_secret = ENV.fetch('STRIPE_WEBHOOK_SIGNING_SECRET')
    event = nil

    begin
      event = Stripe::Webhook.construct_event(payload, sig_header, webhook_signing_secret)
    rescue JSON::ParserError
      logger.debug "JSON::ParserError in webhook."
      return head :bad_request
    rescue Stripe::SignatureVerificationError
      logger.debug "Stripe::SignatureVerificationError in webhook."
      return head :bad_request
    end

    case event.type
    when 'checkout.session.completed'
      checkout_session_completed(event['data']['object'])
    when 'customer.subscription.updated'
      customer_subscription_updated(event['data']['object'])
    when 'customer.subscription.deleted'
      customer_subscription_deleted(event['data']['object'])
    when 'customer.subscription.trial_will_end'
      # TODO send emails telling the user to enter payment info
      logger.debug "customer.subscription.trial_will_end is unhandled"
    when 'invoice.payment_failed'
      # TODO flag the user so they have to enter payment method
      logger.debug "invoice.payment_failed is unhandled"
    else
      logger.debug "Unhandled webhook event #{event.type}"
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

  # Hook fires when user completes checkout successfully.
  # This is used to update the user's payment method or reactivate a canceled subscription.
  def checkout_session_completed(session_object)
    logger.debug "checkout_session_completed webhook processing started."

    case session_object['mode']
    when 'setup'
      process_setup_session(session_object)
    when 'subscription'
      process_subscription_session(session_object)
    else
      logger.debug "Unhandled session mode #{session_object['mode']}"
      head :ok
    end
  ensure
    logger.debug "checkout_session_completed webhook processing completed."
  end

  # Processes the new payment method
  def process_setup_session(stripe_session)
    logger.debug "process_setup_session started"

    client_reference_id = stripe_session['client_reference_id']

    # find the user
    user = User.find_by_id(client_reference_id)
    unless user.present?
      logger.debug "could not find user by client_reference_id #{client_reference_id}"
      return head :ok
    end

    logger.debug "found user #{user.id} #{user.email} #{user.full_name}"

    setup_intent_id = stripe_session['setup_intent']
    setup_intent = Stripe::SetupIntent.retrieve(setup_intent_id)
    logger.debug "retrieved setup_intent #{setup_intent_id}"

    payment_method_id = setup_intent['payment_method']

    # retrieve the payment method
    payment_method = Stripe::PaymentMethod.retrieve(payment_method_id)
    logger.debug "retrieved payment method"

    user.update!(payment_method_id: payment_method['id'], payment_method_last4: payment_method['card']['last4'])
    logger.debug "updated the user's payment method"

    HandlePaymentMethodUpdatedJob.perform_later(user.id, payment_method_id)

    head :ok
  ensure
    logger.debug "process_setup_session completed"
  end

  # Processes the new subscription
  def process_subscription_session(stripe_session)
    client_reference_id = stripe_session['client_reference_id']
    customer_id = stripe_session['customer']
    subscription_id = stripe_session['subscription']

    user = User.find_by_id(client_reference_id)
    unless user.present?
      logger.debug "could not find user by client_reference_id #{client_reference_id}"
      # cancel the subscription because user doesn't exist
      CancelStripeSubscriptionJob.perform_later(subscription_id)
      return head :ok
    end

    logger.debug "found user #{user.id} #{user.email} #{user.full_name}"

    # enqueue job to cancel previous subscription
    CancelStripeSubscriptionJob.perform_later(user.subscription.stripe_id) if user.subscription.present? && !user.subscription.canceled?

    # retrieve the subscription so we can get the payment method for saving later
    subscription = Stripe::Subscription.retrieve(subscription_id)
    logger.debug "retrieved subscription #{subscription_id}"

    payment_method_id = subscription['default_payment_method']

    # retrieve the payment method
    payment_method = Stripe::PaymentMethod.retrieve(payment_method_id)
    logger.debug "retrieved payment method"

    # update their saved payment method immediately
    user.update!(payment_method_id: payment_method['id'], payment_method_last4: payment_method['card']['last4'])
    logger.debug "updated the user's payment method"

    # update existing or create new subscription
    user_subscription = user.subscription || Subscription.new
    user_subscription.assign_attributes(
      stripe_id: subscription['id'],
      current_period_ends_at: Time.at(subscription['current_period_end']),
      trial_starts_at: nil,
      trial_ends_at: nil
    )

    user.update!(subscription: user_subscription)
    logger.debug "updated the user subscription"

    user.subscription.active!
    logger.debug "made new subscription active"

    head :ok
  rescue StandardError => e
    CancelStripeSubscriptionJob.perform_later(subscription_id)
    logger.debug "Unhandled exception raised. Canceling the created subscription."
  end

  # Hook fires when a stripe subscription is changed.
  def customer_subscription_updated(subscription_object)
    logger.debug "customer_subscription_updated event processing started"
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
  def customer_subscription_deleted(subscription_object)
    logger.debug "customer_subscription_deleted webhook processing started."

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
