class CreateOrUpdateStripeCustomerForUserJob < ApplicationJob
  def perform(user_id)
    user = User.find(user_id)
    if user.stripe_id.present?
      Stripe::Customer.update(user.stripe_id, { email: user.email, name: user.full_name })
    else
      customer = Stripe::Customer.create(email: user.email, name: user.full_name)
      user.update!(stripe_id: customer['id'])
    end
  end
end
