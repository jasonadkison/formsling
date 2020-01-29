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
end
