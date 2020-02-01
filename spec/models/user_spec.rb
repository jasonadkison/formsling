require 'rails_helper'

describe User do
  context 'validations' do
    it 'validates user attributes' do
      user = User.new
      user.valid?
      expect(user.errors.full_messages).to match_array([
        "First name can't be blank",
        "Last name can't be blank",
        "Email can't be blank",
        "Password can't be blank"
      ])
    end
  end

  context 'defaults' do
    it 'sets role to member' do
      expect(User.new.member?).to be_truthy
    end
  end

  context 'callbacks' do
    describe 'after_update' do
      it 'syncs the user with the customer' do
        user = create(:stripe_user)
        expect(user).to receive(:sync_user_with_customer).once
        user.save
      end
    end
  end

  describe '#full_name' do
    it 'returns the full name of the user' do
      user = build(:user)
      user.first_name = 'FirstName'
      user.last_name = 'LastName'
      expect(user.full_name).to eq('FirstName LastName')
    end
  end

  describe 'private instance methods' do
    describe '#sync_user_with_customer' do
      let(:user) { build(:user) }

      it 'enqueues the job for updating the customer' do
        user.stripe_id = 'cust_test'
        allow(user).to receive(:saved_change_to_first_name?).and_return(true)
        expect(UpdateStripeCustomerForUserJob).to receive(:perform_later).with(user.id)
        user.send(:sync_user_with_customer)
      end

      it 'does nothing when user has blank stripe_id' do
        user.stripe_id = nil
        expect(UpdateStripeCustomerForUserJob).to_not receive(:perform_later)
        expect(user.send(:sync_user_with_customer)).to eq(nil)
      end

      it 'does nothing when name and email is unchanged' do
        user.stripe_id = 'cus_test'
        allow(user).to receive(:saved_change_to_first_name?).and_return(false)
        allow(user).to receive(:saved_change_to_last_name?).and_return(false)
        allow(user).to receive(:saved_change_to_email?).and_return(false)
        expect(UpdateStripeCustomerForUserJob).to_not receive(:perform_later)
        expect(user.send(:sync_user_with_customer)).to eq(nil)
      end
    end
  end
end
