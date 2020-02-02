class Form < ApplicationRecord
  belongs_to :user
  has_many :results, dependent: :delete_all

  validates :name, presence: true
  validates :user, presence: true
  validates :payload, presence: true
  validates :url, url: true, allow_blank: true

  # Set the default payload
  after_initialize do
    self.payload ||= FormEditor::DefaultPayload::CONTACT_FORM
  end

  def email_recipient
    [super, user.email].reject(&:blank?).first
  end

  # returns the host string for the Content Security Policy frame-ancestor.
  # only this host is allowed to load the form in iframe
  def csp_host
    return unless url.present?

    uri = URI.parse(url.to_s.downcase)
    host = uri.host
    port = uri.port

    return unless host.present?

    # strip out leading www.
    host = host.remove(/^www./)

    return "#{host} *.#{host}" if port.blank? || [80, 443].include?(port)

    "#{host}:#{port} *.#{host}:#{port}"
  rescue URI::InvalidURIError
    nil
  end
end
