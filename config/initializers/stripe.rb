Stripe.api_key = ENV.fetch('STRIPE_MODE', 'test') == 'live' ?
  Rails.application.credentials.stripe[:live_secret_key] :
  Rails.application.credentials.stripe[:test_secret_key]
