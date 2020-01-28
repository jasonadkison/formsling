require 'rails_helper'

describe Form do
  context 'validations' do
    it 'validates attributes' do
      form = Form.new
      form.valid?
      expect(form.errors.full_messages).to match_array([
        "Name can't be blank",
        "User can't be blank",
        "User must exist"
      ])
    end
  end
end
