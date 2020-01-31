class StripeHelpers
  PLAN_ID = 'plan_GdMh40FZp0zoJ1'.freeze

  def self.onboard_user(user)
    create_customer(user) if user.stripe_id.blank?
    create_subscription(user) if user.subscription.blank?
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

  def self.create_subscription(user)
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
      Stripe::Subscription.delete(stripe_subscription.id)
    end
  end

end
