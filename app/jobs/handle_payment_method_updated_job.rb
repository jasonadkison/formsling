class HandlePaymentMethodUpdatedJob < ApplicationJob
  def perform(user_id, payment_method_id)
    user = User.find(user_id)
    customer_id = user.stripe_id

    return unless customer_id.present?

    # Attach card to customer
    StripeHelpers.attach_customer_payment_method(customer_id, payment_method_id)

    # Make card default for customer
    StripeHelpers.update_customer_payment_method(customer_id, payment_method_id)

    subscription_id = user.subscription.try(:stripe_id)
    return unless subscription_id.present?

    # Make card default for subscription
    StripeHelpers.update_subscription_payment_method(subscription_id, payment_method_id)
  end
end
