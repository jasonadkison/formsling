Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do

  end

  # Forward all HTML (non-XHR) requests to StaticController#index
  get '*page', to: 'static#index', constraints: ->(req) { !req.xhr? && req.format.html? }

  root 'static#index'
end
