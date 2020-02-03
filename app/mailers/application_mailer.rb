class ApplicationMailer < ActionMailer::Base
  default from: "FormSling Notification Service <no-reply@#{ActionMailer::Base.default_url_options[:host]}>"
  layout 'mailer'
  helper :mailer
end
