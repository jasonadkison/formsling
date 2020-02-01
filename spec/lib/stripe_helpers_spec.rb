require 'rails_helper'

describe StripeHelpers do

  describe '.onboard_user' do
    let(:stripe_id) { nil }
    let(:subscription) { nil }

    let(:user) { double(stripe_id: stripe_id, subscription: subscription) }

    before do
      allow(described_class).to receive(:create_customer).and_return(nil)
      allow(described_class).to receive(:create_trial_subscription).and_return(nil)
    end

    context 'when user does not have stripe_id' do
      it 'creates a new customer' do
        expect(described_class).to receive(:create_customer).with(user).once
        described_class.send(:onboard_user, user)
      end
    end

    context 'when user has stripe_id' do
      let(:stripe_id) { true }
      it 'does not create a new customer' do
        expect(described_class).to_not receive(:create_customer)
        described_class.send(:onboard_user, user)
      end
    end

    context 'when user does not have a subscription' do
      it 'creates a new subscription' do
        expect(described_class).to receive(:create_trial_subscription).with(user).once
        described_class.send(:onboard_user, user)
      end
    end

    context 'when user has a subscription' do
      let(:subscription) { true }
      it 'does not create a new subscription' do
        expect(described_class).to_not receive(:create_trial_subscription)
        described_class.send(:onboard_user, user)
      end
    end
  end

  describe '.create_customer' do
    it 'creates stripe customer and associates it to the user' do
      user = create(:user)
      customer = double(id: 'cus_1')
      allow(Stripe::Customer).to receive(:create).with(hash_including(email: user.email, name: user.full_name)).and_return(customer)
      allow(user).to receive(:valid?).and_return(true)
      expect {
        described_class.send(:create_customer, user)
      }.to change { user.stripe_id }.from(nil).to('cus_1')
    end

    it 'does not rescue Stripe::Customer.create exceptions' do
      user = build(:user)
      error = StandardError.new('test')
      allow(Stripe::Customer).to receive(:create).and_raise(error)
      expect(Stripe::Customer).to receive(:create)
      expect {
        described_class.send(:create_customer, user)
      }.to raise_error(error)
    end

    it 'deletes the customer when user update fails' do
      user = build(:user)
      customer = double(id: 'cus_1')
      allow(Stripe::Customer).to receive(:create).and_return(customer)
      allow(user).to receive(:update!).and_raise(StandardError)
      expect(Stripe::Customer).to receive(:delete).with(customer.id)
      described_class.send(:create_customer, user)
    end
  end

  describe '.create_trial_subscription' do
    it 'creates stripe subscription and associates it to the user' do
      user = create(:user, stripe_id: 'cust_1')
      current_period_end = 1.day.from_now.to_i
      trial_start = 2.days.from_now.to_i
      trial_end = (user.created_at + 30.days).to_i

      stripe_subscription = double(
        id: 'sub_1',
        plan: double(id: 'plan_1'),
        current_period_end: current_period_end,
        trial_start: trial_start,
        trial_end: trial_end,
        status: 'trialing'
      )

      args = hash_including(customer: user.stripe_id, trial_end: trial_end, items: [{ plan: described_class::PLAN_ID }])
      allow(Stripe::Subscription).to receive(:create).with(args).and_return(stripe_subscription)
      allow(user).to receive(:valid?).and_return(true)
      expect(described_class.send(:create_trial_subscription, user)).to be_truthy

      subscription = Subscription.last
      expect(subscription.user_id).to eq(user.id)
      expect(subscription.stripe_id).to eq('sub_1')
      expect(subscription.plan_id).to eq('plan_1')
      expect(subscription.current_period_ends_at.to_i).to eq(current_period_end)
      expect(subscription.trial_starts_at.to_i).to eq(trial_start)
      expect(subscription.trial_ends_at.to_i).to eq(trial_end)
    end

    it 'does not rescue Stripe::Subscription.create exceptions' do
      user = build(:user, created_at: Time.now)
      error = StandardError.new('test')
      allow(Stripe::Subscription).to receive(:create).and_raise(error)
      expect(Stripe::Subscription).to receive(:create).once
      expect {
        described_class.send(:create_trial_subscription, user)
      }.to raise_error(error)
    end

    it 'deletes the subscription when user update fails' do
      user = create(:user, stripe_id: 'cust_1')
      current_period_end = 1.day.from_now.to_i
      trial_start = 2.days.from_now.to_i
      trial_end = (user.created_at + 30.days).to_i

      stripe_subscription = double(
        id: 'sub_1',
        plan: double(id: 'plan_1'),
        current_period_end: current_period_end,
        trial_start: trial_start,
        trial_end: trial_end,
        status: 'trialing'
      )

      allow(Stripe::Subscription).to receive(:create).and_return(stripe_subscription)
      allow(user).to receive(:update!).and_raise(StandardError)
      expect(Stripe::Subscription).to receive(:delete).with(stripe_subscription.id)

      described_class.send(:create_trial_subscription, user)
    end

  end

  describe '.cancel_subscription' do
    let(:subscription_id) { 'sub_test' }

    it 'deletes the stripe customer' do
      expect(Stripe::Subscription).to receive(:delete).with(subscription_id)
      described_class.send(:cancel_subscription, subscription_id)
    end

    it 'raises any stripe exception' do
      error = StandardError.new('boom')
      allow(Stripe::Subscription).to receive(:delete).and_raise(error)
      expect(Stripe::Subscription).to receive(:delete).once
      expect {
        described_class.send(:cancel_subscription, subscription_id)
      }.to raise_error(error)
    end
  end

  describe '.attach_customer_payment_method' do
    let(:customer_id) { 'cust_test' }
    let(:payment_method_id) { 'pm_test' }

    it 'attaches the payment method to the customer' do
      expect(Stripe::PaymentMethod).to receive(:attach).with(payment_method_id, { customer: customer_id })
      described_class.send(:attach_customer_payment_method, customer_id, payment_method_id)
    end

    it 'raises any stripe exception' do
      error = StandardError.new('boom')
      allow(Stripe::PaymentMethod).to receive(:attach).and_raise(error)
      expect(Stripe::PaymentMethod).to receive(:attach).once
      expect {
        described_class.send(:attach_customer_payment_method, customer_id, payment_method_id)
      }.to raise_error(error)
    end

    it 'rescues when payment method is already attached' do
      error = StandardError.new('already been attached')
      allow(Stripe::PaymentMethod).to receive(:attach).and_raise(error)
      expect {
        described_class.send(:attach_customer_payment_method, customer_id, payment_method_id)
      }.to_not raise_error
    end
  end

  describe '.update_customer_payment_method' do
    let(:customer_id) { 'cust_test' }
    let(:payment_method_id) { 'pm_test' }

    it 'updates the customers payment method' do
      expect(Stripe::Customer).to receive(:update).with(customer_id, invoice_settings: { default_payment_method: payment_method_id })
      described_class.send(:update_customer_payment_method, customer_id, payment_method_id)
    end

    it 'raises any stripe exception' do
      error = StandardError.new('boom')
      allow(Stripe::Customer).to receive(:update).and_raise(error)
      expect(Stripe::Customer).to receive(:update).once
      expect {
        described_class.send(:update_customer_payment_method, customer_id, payment_method_id)
      }.to raise_error(error)
    end
  end

  describe '.update_subscription_payment_method' do
    let(:subscription_id) { 'sub_test' }
    let(:payment_method_id) { 'pm_test' }

    it 'updates the subscription payment method' do
      expect(Stripe::Subscription).to receive(:update).with(subscription_id, default_payment_method: payment_method_id)
      described_class.send(:update_subscription_payment_method, subscription_id, payment_method_id)
    end

    it 'does not rescue any stripe exception' do
      error = StandardError.new('boom')
      allow(Stripe::Subscription).to receive(:update).and_raise(error)
      expect(Stripe::Subscription).to receive(:update).once
      expect {
        described_class.send(:update_subscription_payment_method, subscription_id, payment_method_id)
      }.to raise_error(error)
    end
  end

end
