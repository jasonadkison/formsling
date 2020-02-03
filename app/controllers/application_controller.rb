class ApplicationController < ActionController::Base
  if ENV["DISALLOW_ALL_WEB_CRAWLERS"].present?
    http_basic_authenticate_with(
      name: ENV.fetch("BASIC_AUTH_USERNAME"),
      password: ENV.fetch("BASIC_AUTH_PASSWORD"),
    )
  end

  before_action :check_subscription

  protected

  def check_subscription
    return unless user_signed_in? # don't check subscription for visitors
    return if current_user.admin? # don't check subscription for admin
    return if devise_controller? # don't block authentication endpoints

    # don't block landing pages except react app
    return if controller_name == 'welcome' && action_name != 'index'

    # don't block subscription pages
    return if stripe_controller?

    subscription = current_user.subscription
    return subscription_blocker unless subscription.present? # require a subscription
    return subscription_blocker unless subscription.trialing? || subscription.active?
  end

  def subscription_blocker
    flash[:error] = "Please update your subscription before continuing."
    redirect_to edit_user_registration_path
  end

  def stripe_controller?
    self.is_a?(Stripe::SubscriptionController)
  end

end
