class UpdateStripeCustomerForUserJob < ApplicationJob
  def perform(user_id)
    user = User.find(user_id)
    begin
      update_stripe_customer_for_user(user)
    rescue StandardError => e
      raise e unless e.message.include?("No such customer")
      create_stripe_customer_for_user(user)
    end
  end

  private

  def update_stripe_customer_for_user(user)
    Stripe::Customer.update(user.stripe_id, { email: user.email, name: user.full_name })
  end

  def create_stripe_customer_for_user(user)
    customer = Stripe::Customer.create(email: user.email, name: user.full_name)
    user.update!(stripe_id: customer.id)
  end
end
