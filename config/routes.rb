Rails.application.routes.draw do
  require 'sidekiq/web'

  if Rails.env.development?
    mount Sidekiq::Web => '/sidekiq'
  else
    authenticate :user, lambda { |u| u.admin? } do
      mount Sidekiq::Web => '/sidekiq'
    end
  end

  devise_for :users, controllers: { registrations: 'users/registrations' }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :forms do
        resources :results, only: [:index]
      end
    end
  end

  # health check endpoint
  get '/health', to: proc {[200, {}, ['ok']]}

  # public form routes
  get '/embed', to: 'public_form#embed', as: 'embed'
  get '/f/:id', to: 'public_form#show', as: 'public_form'
  post '/f/:id', to: 'public_form#submit', defaults: { format: :json }

  # result endpoint
  get '/r/:id', to: 'result#show', as: 'result'

  # subscriptions
  resources :subscriptions, only: [:index] do
    collection do
      get '/confirm/:plan', to: 'subscriptions#confirm', as: 'confirm'
    end
  end

  namespace :stripe, path: '/subscription' do
    post '/', to: 'subscription#create', as: 'create_subscription'
    put '/', to: 'subscription#update', as: 'update_subscription'
    delete '/', to: 'subscription#destroy', as: 'destroy_subscription'
    post '/webhook', to: 'subscription#webhook', as: 'subscription_webhook'
  end

  # pages
  get '/pricing', to: 'welcome#pricing', as: 'pricing'
  get '/contact', to: 'welcome#contact', as: 'contact'
  get '/faq', to: 'welcome#faq', as: 'faq'

  # catch every other request and send it to our react app
  get '*anything', to: 'dashboard#index',
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
