require 'rails_helper'

describe UpdateStripeCustomerForUserJob do
  let(:service) { Stripe::Customer }
  let(:customer_id) { 'cust_test' }
  let(:user) { build(:user, id: 1, stripe_id: customer_id) }
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

  it 'updates the customer' do
    expect(service).to receive(:update).with(customer_id, { email: user.email, name: user.full_name })
    perform_enqueued_jobs { job }
  end

  it 'creates the customer if they dont exist' do
    error = StandardError.new('No such customer')
    allow(service).to receive(:update).and_raise(error)
    allow(service).to receive(:create).with(email: user.email, name: user.full_name).and_return(double(id: customer_id))
    expect(user).to receive(:update!).with(stripe_id: customer_id)
    perform_enqueued_jobs { job }
  end

  after do
    clear_enqueued_jobs
    clear_performed_jobs
  end
end
