class DeviseMailer < Devise::Mailer
  helper :mailer
  include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer'
  layout 'mailer'
end
