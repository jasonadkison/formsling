class ApplicationController < ActionController::Base
  if ENV["DISALLOW_ALL_WEB_CRAWLERS"].present?
    http_basic_authenticate_with(
      name: ENV.fetch("BASIC_AUTH_USERNAME"),
      password: ENV.fetch("BASIC_AUTH_PASSWORD"),
    )
  end

  before_action :redirect_to_subscriptions

  private

  def redirect_to_subscriptions
    return unless user_signed_in?
    return unless current_user.should_choose_subscription?

    current_user.update!(should_choose_subscription: false)
    redirect_to subscriptions_path
  end
end
