require 'factory_bot'

class UserMailerPreview < ActionMailer::Preview

  def subscription_canceled
    UserMailer.subscription_canceled(FactoryBot.build(:user))
  end

  def result_processed
    result = FactoryBot.build(:result)
    pdf = Tempfile.new(['test', '.pdf'])
    UserMailer.result_processed(result, pdf)
  end

  def new_hidden_result
    result = FactoryBot.build(:result)
    UserMailer.new_hidden_result(result)
  end

end
