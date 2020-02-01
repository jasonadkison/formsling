require 'rails_helper'

describe Subscription do
  context 'validations' do
    it 'requires user' do
      subscription = build(:subscription, user: nil)
      subscription.valid?
      expect(subscription.errors.full_messages).to include('User must exist')
      expect(subscription.errors.full_messages).to include("User can't be blank")
    end

    it 'requires plan_id' do
      subscription = build(:subscription, plan_id: nil)
      subscription.valid?
      expect(subscription.errors.full_messages).to include("Plan can't be blank")
    end

    it 'requires stripe_id' do
      subscription = build(:subscription, stripe_id: nil)
      subscription.valid?
      expect(subscription.errors.full_messages).to include("Stripe can't be blank")
    end

    it 'requires current_period_ends_at' do
      subscription = build(:subscription, current_period_ends_at: nil)
      subscription.valid?
      expect(subscription.errors.full_messages).to include("Current period ends at can't be blank")
    end
  end

  context 'defaults' do
    it 'sets the default status' do
      expect(Subscription.new.status.present?).to be_truthy
    end
  end
end
