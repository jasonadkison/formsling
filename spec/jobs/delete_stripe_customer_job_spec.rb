require 'rails_helper'

describe DeleteStripeCustomerJob do
  let(:service) { Stripe::Customer }
  let(:customer_id) { 'cus_test' }
  subject(:job) { described_class.perform_later(customer_id) }

  it 'queues the job' do
    expect { job }.to change(queue_adapter.enqueued_jobs, :size).from(0).to(1)
  end

  it 'uses default queue' do
    expect(described_class.new.queue_name).to eq('default')
  end

  it 'calls the service' do
    expect(service).to receive(:delete).with(customer_id)
    perform_enqueued_jobs { job }
  end

  after do
    clear_enqueued_jobs
    clear_performed_jobs
  end
end
