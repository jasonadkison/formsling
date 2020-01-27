# payload attribute is stored as base64 format (UTF-8)
class Result < ApplicationRecord
  belongs_to :form
  validates_presence_of :payload
  validates_presence_of :form

  # Returns the full html content for the result
  def html
    ApplicationController.render(
      template: 'result/show.html',
      layout: 'public_form.html',
      assigns: { result: self }
    )
  end

  def pdf_html
    ApplicationController.render(
      template: 'result/show.html',
      layout: 'pdf.html',
      assigns: { result: self }
    )
  end

  def pdf_filename
    [form.name, 'formsling-result', Time.zone.now.to_i].join(' ').parameterize
  end

  def payload
    res = Base64.decode64(super)
    ActionController::Base.helpers.sanitize(
      res,
      tags: %w(h1 h2 h3 h4 h5 span i div label input textarea select option button a br),
      attributes: %w(&nbsp selected checked value id class name for type data-name data-value)
    )
  end

  def values
    Base64.decode64(super)
  end

  def values_object
    JSON.load(values)
  end
end
