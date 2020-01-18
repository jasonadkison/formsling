Rails.application.routes.draw do
  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :forms
    end
  end

  get '/f/:id', to: 'public_form#show'

  # Forward all HTML (non-XHR) requests to DashboardController#index
  get '*page', to: 'dashboard#index', constraints: ->(req) { !req.xhr? && req.format.html? }
  get '/app', to: 'dashboard#index', as: 'app'

  root 'welcome#index'
end
