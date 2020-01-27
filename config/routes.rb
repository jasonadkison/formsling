Rails.application.routes.draw do
  require 'sidekiq/web'

  authenticate :user, lambda { |u| u.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_for :users

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :forms do
        resources :results, only: [:index]
      end
    end
  end

  get '/health', to: proc {[200, {}, ['ok']]}
  get '/embed', to: 'public_form#embed', as: 'embed'
  get '/f/:id', to: 'public_form#show', as: 'public_form'
  post '/f/:id', to: 'public_form#submit', defaults: { format: :json }
  get '/r/:id', to: 'result#show', as: 'result'

  # catch every other request and send it to our react app
  get '*page', to: 'dashboard#index',
    constraints: lambda { |req|
      # exclude XHR requests
      return false if req.xhr?

      # exclude non-html requests
      return false unless req.format.html?

      # exclude any engine routes manually (e.g. sidekiq)
      req.path.exclude?('/sidekiq')
    }

  root 'welcome#index'
end
