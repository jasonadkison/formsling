class UserMailer < ApplicationMailer
  def result_processed(result, pdf)
    @result = result
    attachments[File.basename(pdf.path)] = pdf.read
    pdf.close
    pdf.unlink
    mail to: @result.form.email_recipient,
         subject: t('user_mailer.result_processed.subject', name: result.form.name)
  end

  def new_hidden_result(result)
    @result = result
    mail to: @result.user.email,
         subject: t('user_mailer.new_hidden_result.subject', name: result.form.name)
  end

  def subscription_canceled(user)
    @user = user

    mail to: @user.email, subject: t('user_mailer.subscription_canceled.subject')
  end
end
