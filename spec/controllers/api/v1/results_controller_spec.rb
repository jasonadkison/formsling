require 'rails_helper'

describe Api::V1::ResultsController do
  it 'is an application controller' do
    expect(subject.class < Api::Controller).to be_truthy
  end
end
