# payload attribute is stored as base64 format (UTF-8)
class Result < ApplicationRecord
  belongs_to :form
  delegate :user, to: :form
  validates_presence_of :payload
  validates_presence_of :values
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
    return if super.blank?

    res = Base64.decode64(super)
    ActionController::Base.helpers.sanitize(
      res,
      tags: %w(h1 h2 h3 h4 h5 h6 p span i em addr ul ol li div label input textarea select option button a br),
      attributes: %w(&nbsp selected checked value id class name for type data-name data-value style)
    )
  end

  def values
    return if super.blank?

    Base64.decode64(super)
  end

  def values_object
    JSON.load(values)
  end
end
