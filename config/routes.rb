Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'

  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :forms
    end
  end

  get '/embed', to: 'public_form#embed', as: 'embed'
  get '/f/:id', to: 'public_form#show', as: 'public_form'
  post '/f/:id', to: 'public_form#submit', defaults: { format: :json }

  get '/r/:id', to: 'result#show', as: 'result'

  # Forward all HTML (non-XHR) requests to DashboardController#index
  get '*page', to: 'dashboard#index', constraints: ->(req) { !req.xhr? && req.format.html? }

  root 'welcome#index'
end
