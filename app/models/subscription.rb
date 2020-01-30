class Subscription < ApplicationRecord
  # https://stripe.com/docs/api/subscriptions/object
  enum status: [:trialing, :active, :canceled, :past_due, :unpaid, :incomplete, :incomplete_expired]

  belongs_to :user

  validates_presence_of :user_id
  validates_presence_of :plan_id
  validates_presence_of :stripe_id
  validates_presence_of :current_period_ends_at
  validates_presence_of :trial_starts_at
  validates_presence_of :trial_ends_at

  after_initialize do
    self.status ||= :trialing if self.new_record?
  end

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
