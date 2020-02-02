require 'factory_bot'

class DeviseMailerPreview < ActionMailer::Preview

  def confirmation_instructions
    record = FactoryBot.build(:user)
    token = 'test-token'
    DeviseMailer.confirmation_instructions(record, token)
  end

  def reset_password_instructions
    record = FactoryBot.build(:user)
    token = 'test-token'
    DeviseMailer.reset_password_instructions(record, token)
  end

  def email_changed
    record = FactoryBot.build(:user)
    DeviseMailer.email_changed(record)
  end

  def password_change
    record = FactoryBot.build(:user)
    DeviseMailer.password_change(record)
  end

end
