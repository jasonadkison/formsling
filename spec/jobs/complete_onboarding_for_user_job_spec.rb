require 'rails_helper'

describe CompleteOnboardingForUserJob do
  let(:service) { StripeHelpers }
  let(:user) { double(id: 1) }
  subject(:job) { described_class.perform_later(1) }

  before do
    allow(User).to receive(:find).with(1).and_return(user)
  end

  it 'queues the job' do
    expect { job }.to change(queue_adapter.enqueued_jobs, :size).from(0).to(1)
  end

  it 'uses default queue' do
    expect(described_class.new.queue_name).to eq('default')
  end

  it 'calls the service' do
    expect(service).to receive(:onboard_user).with(user)
    perform_enqueued_jobs { job }
  end

  after do
    clear_enqueued_jobs
    clear_performed_jobs
  end
end
