require 'rails_helper'

describe DashboardController do
  it 'is an application controller' do
    expect(subject.class < ApplicationController).to be_truthy
  end
end
