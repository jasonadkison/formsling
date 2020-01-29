Stripe.api_key = Rails.env.production? ?
  Rails.application.credentials.stripe[:live_secret_key] :
  Rails.application.credentials.stripe[:test_secret_key]
