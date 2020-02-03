# FormSling.com

Build and embed web forms with ease.

## Stack
- Ruby 2.6.5
- Rails 6
- PostgreSQL 11.6
- Redis 5.0.7
- React.js 16
- Webpacker
- Docker
- Docker Compose
- CircleCI
- DigitalOcean
- Dokku

## Stripe

### Webhooks

#### checkout.session.completed
Fires when a user starts a new subscription or updates their payment method.

#### customer.subscription.updated
Fires when a subscription is updated. Use this to update the subscription status.

#### customer.subscription.deleted
Fires when a subscription is canceled. Use this to flag the subscription as canceled.

#### customer.subscription.trial_will_end
Fires 3 days before a trial subscription will end. Use this to trigger an email to the user.

#### invoice.payment_failed
Fires when a payment fails. Currently not being used.

### Listening to webhooks in development
[Install stripe-cli](https://stripe.com/docs/stripe-cli#install) in order to use webhooks in development. Follow the instructions to login.

#### Run the webhook listener
```bash
stripe listen --forward-to http://localhost:3000/subscription/webhook -e 'checkout.session.completed,customer.subscription.updated,customer.subscription.deleted,customer.subscription.trial_will_end,invoice.payment_failed'
```
This will output the webhook signing key when started.

Export this key to your ENV so it can be consumed in docker-compose. The
key does not change.

```bash
export STRIPE_WEBHOOK_SIGNING_SECRET={{THE_WEBHOOK_SECRET}}
```
