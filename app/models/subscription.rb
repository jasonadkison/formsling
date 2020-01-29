class Subscription < ApplicationRecord
  belongs_to :user

  validates_presence_of :user_id
  validates_presence_of :plan_id
  validates_presence_of :stripe_id
  validates_presence_of :current_period_ends_at

  # Stop any existing subscription.
  after_destroy do
    delete_stripe_subscription
  end

  def interrupt
    delete_stripe_subscription && deactivate
  end

  def delete_stripe_subscription
    Stripe::Subscription.delete(stripe_id)
  end

  def deactivate
    return unless active?
    return false unless update(active: false)

    UserMailer.subscription_ended(self).deliver_later
  end
end
