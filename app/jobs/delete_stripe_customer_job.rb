class DeleteStripeCustomerJob < ApplicationJob
  def perform(stripe_id)
    Stripe::Customer.delete(stripe_id)
  end
end
