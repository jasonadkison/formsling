web: bundle exec rails server -b 0.0.0.0 -p 3000
worker: bundle exec sidekiq -C config/sidekiq.yml
release: bundle exec rake db:migrate
