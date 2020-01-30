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
      return head :bad_request
    rescue Stripe::SignatureVerificationError
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
      return head :bad_request
    end

    head :ok
  end

  private

  def stripe_publishable_key
    return Rails.application.credentials.stripe[:live_publishable_key] if ENV.fetch('STRIPE_MODE', 'test') == 'live'

    Rails.application.credentials.stripe[:test_publishable_key]
  end

  def stripe_webhook_endpoint_secret
    return Rails.application.credentials.stripe[:live_signing_secret] if ENV.fetch('STRIPE_MODE', 'test') == 'live'

    Rails.application.credentials.stripe[:test_signing_secret]
  end

  # Hook fires when user completes checkout successfully.
  # - Creates or updates the user's subscription.
  # - Destroys any previously active subscription.
  def checkout_session_completed(event)
    session_object = event['data']['object']
    customer = Stripe::Customer.retrieve(session_object['customer'])
    stripe_subscription = Stripe::Subscription.retrieve(session_object['subscription'])

    user = User.find_by(id: session_object['client_reference_id'])
    user.subscription.interrupt if user.active_subscription?

    subscription = user.subscription || Subscription.new

    subscription.assign_attributes(
      plan_id: stripe_subscription.plan.id,
      stripe_id: stripe_subscription.id,
      current_period_ends_at: Time.zone.at(stripe_subscription.current_period_end),
      active: true
    )

    user.update!(stripe_id: customer.id, subscription: subscription)
  end

  # Hook fires when a stripe subscription is changed.
  # Syncs the current_period_end.
  # If the subscription is no longer active then it will deactivate the user's subscription.
  def customer_subscription_updated(event)
    subscription_object = event['data']['object']
    subscription = Subscription.find_by(stripe_id: subscription_object['id'])
    return head :bad_request unless subscription.present?

    # Update the current_period_ends_at
    subscription.update(current_period_ends_at: Time.zone.at(subscription_object['current_period_end']))

    # Do nothing else if the status is active.
    return head :ok if subscription_object['status'] == 'active'

    # Deactivate the user subscription
    return head :ok unless subscription.active?
    return head :bad_request unless subscription.deactivate

    head :ok
  end

  # Hook fires when customer’s subscription is canceled immediately.
  def customer_subscription_deleted(event)
    subscription_object = event['data']['object']
    subscription = Subscription.find_by(stripe_id: subscription_object['id'])
    return head :bad_request unless subscription.present? && subscription.deactivate

    head :ok
  end

end
