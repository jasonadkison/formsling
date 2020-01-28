require 'rails_helper'

describe Form do
  subject { Form.new }

  context 'validations' do
    it 'validates attributes' do
      subject.valid?
      expect(subject.errors.full_messages).to match_array([
        "Name can't be blank",
        "User can't be blank",
        "User must exist"
      ])
    end

    it 'requires payload' do
      subject.payload = nil
      subject.valid?
      expect(subject.errors.full_messages).to include("Payload can't be blank")
    end
  end

  context 'defaults' do
    it 'sets the default payload' do
      expect(subject.payload.present?).to be_truthy
    end
  end

  describe '#email_recipient' do
    before { allow(subject).to receive(:user).and_return(double(email: 'user@test.com')) }
    context 'when email_recipient is present' do
      before { subject.email_recipient = 'form@test.com' }
      it 'returns the email_recipient' do
        expect(subject.email_recipient).to eq 'form@test.com'
      end
    end
    context 'when email_recipient is not present' do
      before { subject.email_recipient = nil }
      it 'returns the user email' do
        expect(subject.email_recipient).to eq 'user@test.com'
      end
    end
  end
end
