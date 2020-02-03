class StripeHelpers

  PLAN_ID = ENV.fetch('STRIPE_PLAN', 'plan_GdMh40FZp0zoJ1')

  def self.onboard_user(user)
    create_customer(user) if user.stripe_id.blank?
    create_trial_subscription(user) if user.subscription.blank?
  end

  def self.create_customer(user)
    stripe_customer = Stripe::Customer.create(
      email: user.email,
      name: user.full_name,
      metadata: {
        environment: Rails.env,
        user_id: user.id
      }
    )

    begin
      user.update!(stripe_id: stripe_customer.id)
    rescue
      Stripe::Customer.delete(stripe_customer.id)
    end
  end

  def self.create_trial_subscription(user)
    stripe_subscription = Stripe::Subscription.create(
      customer: user.stripe_id,
      items: [{ plan: PLAN_ID }],
      trial_end: (user.created_at + 30.days).to_i
    )

    begin
      subscription = Subscription.new(
        stripe_id: stripe_subscription.id,
        plan_id: stripe_subscription.plan.id,
        current_period_ends_at: Time.at(stripe_subscription.current_period_end),
        trial_starts_at: Time.at(stripe_subscription.trial_start),
        trial_ends_at: Time.at(stripe_subscription.trial_end),
        status: stripe_subscription.status
      )

      user.update!(subscription: subscription)
    rescue
      cancel_subscription(stripe_subscription.id)
    end
  end

  def self.cancel_subscription(subscription_id)
    Stripe::Subscription.delete(subscription_id)
    Rails.logger.debug "Canceled subscription #{subscription_id}"
  rescue StandardError => e
    raise e unless e.message.include?('No such subscription')
    Rails.logger.debug "Subscription #{subscription_id} not found"
  end

  # Attaches the new payment method to the customer
  def self.attach_customer_payment_method(customer_id, payment_method_id)
    begin
      Stripe::PaymentMethod.attach(payment_method_id, customer: customer_id)
      Rails.logger.debug "attached new payment method to customer"
    rescue StandardError => e
      raise e unless e.message.include?('already been attached')
      Rails.logger.debug "The payment method has already been attached to a customer"
    end
  end

  def self.update_customer_payment_method(customer_id, payment_method_id)
    Stripe::Customer.update(
      customer_id, invoice_settings: { default_payment_method: payment_method_id }
    )
    Rails.logger.debug "updated the customer's default payment method"
  end

  # Sets the default payment method on a subscription
  def self.update_subscription_payment_method(subscription_id, payment_method_id)
     Stripe::Subscription.update(subscription_id, default_payment_method: payment_method_id)
     Rails.logger.debug "updated default payment method on subscription #{subscription_id}"
  end

end
