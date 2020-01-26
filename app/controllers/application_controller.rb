class ApplicationController < ActionController::Base
  if ENV["DISALLOW_ALL_WEB_CRAWLERS"].present?
    http_basic_authenticate_with(
      name: ENV.fetch("BASIC_AUTH_USERNAME"),
      password: ENV.fetch("BASIC_AUTH_PASSWORD"),
    )
  end
end
