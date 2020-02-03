require 'rails_helper'

describe Users::RegistrationsController do
  let(:valid_attributes) { attributes_for(:user) }
  let(:invalid_attributes) { attributes_for(:user, password: nil) }
  before { @request.env['devise.mapping'] = Devise.mappings[:user] }

  describe '#create' do
    context 'with valid attributes' do
      it 'enqueues job for completing onboarding' do
        assert_enqueued_with(job: CompleteOnboardingForUserJob) do
          post :create, params: { user: valid_attributes }
        end
      end
    end

    context 'with invalid attributes' do
      it 'does not job for completing onboarding' do
        assert_no_enqueued_jobs(only: CompleteOnboardingForUserJob) do
          post :create, params: { user: invalid_attributes }
        end
      end
    end
  end
end
