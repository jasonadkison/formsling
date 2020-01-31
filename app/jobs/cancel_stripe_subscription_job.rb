class CancelStripeSubscriptionJob < ApplicationJob
  def perform(subscription_id)
    StripeHelpers.cancel_subscription(subscription_id)
  end
end
