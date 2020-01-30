class CreateOrUpdateStripeCustomerForUserJob < ApplicationJob
  def perform(user_id)
    user = User.find(user_id)
    return create_stripe_customer_for_user(user) unless user.stripe_id.present?

    update_stripe_customer_for_user(user)
  end

  private

  def create_stripe_customer_for_user(user)
    customer = Stripe::Customer.create(email: user.email, name: user.full_name)
    user.update!(stripe_id: customer['id'])
  end

  def update_stripe_customer_for_user(user)
    Stripe::Customer.update(user.stripe_id, { email: user.email, name: user.full_name })
  rescue Stripe::InvalidRequestError => e
    if e.message.include?("No such customer")
      create_stripe_customer_for_user(user)
    else
      raise e
    end
  end
end
