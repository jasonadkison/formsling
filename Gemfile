# frozen_string_literal: true
source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.5'

gem 'activeadmin'
gem 'ahoy_matey'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'devise'
gem 'devise-async'
gem 'jbuilder', '~> 2.7'
gem 'meta-tags'
gem 'pg'
gem 'puma', '~> 4.1'
gem 'rails', '~> 6.0.2', '>= 6.0.2.1'
gem 'react-rails'
gem 'recaptcha'
gem 'rollbar'
gem 'sidekiq'
gem 'stripe'
gem 'validate_url'
gem 'webpacker', '~> 4.0'
gem 'wicked_pdf'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara', '>= 2.15'
  gem 'database_cleaner-active_record'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'rspec-rails', '4.0.0.beta4'
  gem 'rspec_junit_formatter'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'meta_request'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
