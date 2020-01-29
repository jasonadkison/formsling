require 'rails_helper'

describe Result do
  context 'validations' do
    it 'validates attributes' do
      result = Result.new
      result.valid?
      expect(result.errors.full_messages).to match_array([
        "Form can't be blank",
        "Form must exist",
        "Payload can't be blank",
        "Values can't be blank"
      ])
    end
  end
end
