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

    context 'when published' do
      subject { build(:form, published: true) }

      it 'allows a valid url' do
        subject.url = 'http://test.com/test.html'
        expect(subject.valid?).to be_truthy
      end

      it 'allows a valid url with port' do
        subject.url = 'http://test.com:5000/test.html'
        expect(subject.valid?).to be_truthy
      end

      it 'requires url' do
        subject.url = nil
        subject.valid?
        expect(subject.errors.full_messages).to include("Url can't be blank")
      end

      it 'requires a valid url' do
        subject.url = "somewhere.net"
        subject.valid?
        expect(subject.errors.full_messages).to include("Url is not a valid URL")
      end
    end
  end

  context 'defaults' do
    it 'sets the default payload' do
      expect(subject.payload.present?).to be_truthy
    end
    it 'is unpublished' do
      expect(subject.published?).to be_falsey
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

  describe '#csp_host' do
    it 'returns nil when form does not have a url' do
      subject.url = ''
      expect(subject.csp_host).to be_nil
    end

    it 'returns nil when url is malformed' do
      subject.url = '00000'
      expect(subject.csp_host).to be_nil
    end

    it 'returns the hosts without port and www.' do
      subject.url = 'https://WWW.TEST.COM/some-path/sub-path'
      expect(subject.csp_host).to eq 'test.com *.test.com'

      subject.url = 'https://TEST.COM:443/some-path/sub-path'
      expect(subject.csp_host).to eq 'test.com *.test.com'
    end

    it 'returns the hosts with port when port is not 80' do
      subject.url = 'https://WWW.TEST.COM:5000/some-path/sub-path'
      expect(subject.csp_host).to eq 'test.com:5000 *.test.com:5000'
    end

    it 'returns the hosts with subdomains without port' do
      subject.url = 'https://subdomain.TEST.COM/some-path/sub-path'
      expect(subject.csp_host).to eq 'subdomain.test.com *.subdomain.test.com'
    end

    it 'returns the hosts with subdomains with port when port is not 80' do
      subject.url = 'https://subdomain.TEST.COM:5000/some-path/sub-path'
      expect(subject.csp_host).to eq 'subdomain.test.com:5000 *.subdomain.test.com:5000'
    end
  end
end
