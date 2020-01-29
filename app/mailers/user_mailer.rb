class UserMailer < ApplicationMailer
  def result_processed(result, pdf_file)
    @result = result

    attachments[File.basename(pdf_file.path)] = pdf_file.read
    mail to: @result.form.email_recipient,
         subject: t('user_mailer.result_processed.subject', name: result.form.name)
  end
end
