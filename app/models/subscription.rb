class Subscription < ApplicationRecord
  # https://stripe.com/docs/api/subscriptions/object
  enum status: [:trialing, :active, :canceled, :past_due, :unpaid, :incomplete, :incomplete_expired]

  belongs_to :user

  validates_presence_of :user_id
  validates_presence_of :plan_id
  validates_presence_of :stripe_id
  validates_presence_of :current_period_ends_at

  after_initialize do
    self.status ||= :trialing if self.new_record?
  end
end
