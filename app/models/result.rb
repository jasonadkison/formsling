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
        payload: decode_payload,
        result: self,
        form: form
      }
    )
  end

  def pdf_filename
    [form.name, "FormSling.com", Time.zone.now.to_i].join(' ').parameterize
  end

  def decode_payload
    Base64.decode64(payload)
  end

  def decode_values
    Base64.decode64(values)
  end

  def values_object
    JSON.parse(decode_values)
  end
end
