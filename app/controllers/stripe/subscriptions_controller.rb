class Stripe::SubscriptionsController < ApplicationController
  before_action :authenticate_user!, except: :webhook
  skip_before_action :verify_authenticity_token, only: :webhook

  def new
    @stripe_session = Stripe::Checkout::Session.create(
      customer: current_user.stripe_id,
      payment_method_types: ['card'],
      subscription_data: {
        items: [{
          plan: 'plan_GdMh40FZp0zoJ1'
        }]
      },
      client_reference_id: current_user.id,
      success_url: stripe_successful_checkout_url,
      cancel_url: stripe_canceled_checkout_url
    )

    @publishable_key = stripe_publishable_key
  end

  def cancel
    return head :bad_request unless current_user.active_subscription?

    current_user.subscription.interrupt
  end

  def successful_checkout
    redirect_to root_path
  end

  def canceled_checkout
    redirect_to subscriptions_path
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
      logger.debug "Unhandled webhook event #{event.inspect}"
      return head :bad_request
    end

    head :ok
  end

  private

  def stripe_publishable_key
    return Rails.application.credentials.stripe[:live_publishable_key] if ENV.fetch('STRIPE_MODE', 'test') == 'live'

    Rails.application.credentials.stripe[:test_publishable_key]
  end

  # returns the unique webhook signing secret (different per environment)
  def stripe_webhook_endpoint_secret
    return Rails.application.credentials.stripe[:development_webhook_signing_secret] if Rails.env.development?

    ENV.fetch('STRIPE_WEBHOOK_SIGNING_SECRET')
  end

  # Hook fires when user completes checkout successfully.
  # - Creates or updates the user's subscription.
  # - Destroys any previously active subscription.
  def checkout_session_completed(event)
    logger.debug "checkout_session_completed webhook processing started."

    session_object = event['data']['object']
    customer = Stripe::Customer.retrieve(session_object['customer'])
    stripe_subscription = Stripe::Subscription.retrieve(session_object['subscription'])

    user = User.find_by(id: session_object['client_reference_id'])
    if user.active_subscription?
      logger.debug "Interrupting previous user subscription."
      user.subscription.interrupt
    end

    subscription = user.subscription || Subscription.new

    subscription.assign_attributes(
      plan_id: stripe_subscription.plan.id,
      stripe_id: stripe_subscription.id,
      current_period_ends_at: Time.zone.at(stripe_subscription.current_period_end),
      active: true
    )

    user.update!(stripe_id: customer.id, subscription: subscription)
    logger.debug "Setup active user subscription with id #{user.subscription.id}."
  ensure
    logger.debug "checkout_session_completed webhook processing completed."
  end

  # Hook fires when a stripe subscription is changed.
  # Syncs the current_period_end.
  # If the subscription is no longer active then it will deactivate the user's subscription.
  def customer_subscription_updated(event)
    logger.debug "customer_subscription_updated event processing started"
    logger.debug "Subscription status is #{subscription_object['status']}"

    subscription_object = event['data']['object']
    subscription = Subscription.find_by(stripe_id: subscription_object['id'])

    unless subscription.present?
      logger.debug "Could not find subscription for #{subscription_object.inspect}"
      return head :bad_request
    end

    # Update the current_period_ends_at
    subscription.update(current_period_ends_at: Time.zone.at(subscription_object['current_period_end']))
    logger.debug "Updated subscription #{subscription.id} current_period_ends_at to #{subscription_object['current_period_end']}"

    # Do nothing else if the status is active.
    if subscription_object['status'] == 'active'
      subscription.update(active: true)
      logger.debug "Subscription status is active, nothing else to do."
      return head :ok
    end

    # Deactivate the user subscription
    unless subscription.active?
      logger.debug "User subscription not currently active. Nothing to deactivate."
      return head :ok
    end

    unless subscription.deactivate
      logger.debug "Could not deactivate the user subscription."
      return head :bad_request
    end

    head :ok
  ensure
    logger.debug "customer_subscription_updated webhook processing completed."
  end

  # Hook fires when customer’s subscription is canceled immediately.
  def customer_subscription_deleted(event)
    logger.debug "customer_subscription_deleted webhook processing started."

    subscription_object = event['data']['object']
    subscription = Subscription.find_by(stripe_id: subscription_object['id'])

    unless subscription.present?
      logger.debug "Could not find user subscription with stripe_id #{subscription_object['id']}"
      return head :bad_request
    end

    logger.debug "User subscription located with id #{subscription.id}."

    unless subscription.active?
      logger.debug "User subscription not currently active. Nothing to deactivate."
      return head :bad_request
    end

    logger.debug "User subscription is currently marked active."

    unless subscription.deactivate
      logger.debug "Could not deactivate the user subscription with id #{subscription.id}."
      return head :bad_request
    end

    head :ok
  ensure
    logger.debug "customer_subscription_deleted webhook processing completed."
  end

end
