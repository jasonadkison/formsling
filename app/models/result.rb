# payload attribute is stored as base64 format (UTF-8)
class Result < ApplicationRecord
  belongs_to :form
  validates_presence_of :payload
  validates_presence_of :form

  # Returns the full html content for the result
  def html
    ApplicationController.render(
      template: 'result/show',
      layout: 'pdf.html',
      assigns: {
        payload: Base64.decode64(payload),
        result: self,
        form: form
      }
    )
  end

  def pdf_filename
    [form.name, "FormSling.com", Time.zone.now.to_i].join(' ').parameterize
  end
end
