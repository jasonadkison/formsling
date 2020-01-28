require 'rails_helper'

describe WelcomeController do
  it 'is an application controller' do
    expect(subject.class < ApplicationController).to be_truthy
  end
end
