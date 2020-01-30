# Completes the onboarding process for a user.
# - Creates the customer in Stripe
# - Starts the trial subscription in Stripe
class CompleteOnboardingForUserJob < ApplicationJob
  def perform(user_id)
    user = User.find(user_id)
    StripeHelpers.onboard_user(user)
  end
end
