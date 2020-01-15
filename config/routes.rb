Rails.application.routes.draw do
  resources :forms
  devise_for :users
  namespace :api, defaults: { format: :json } do

  end

  # Forward all HTML (non-XHR) requests to StaticController#index
  get '/app/*page', to: 'dashboard#index', constraints: ->(req) { !req.xhr? && req.format.html? }
  get '/app', to: 'dashboard#index', as: 'app'

  root 'welcome#index'
end
