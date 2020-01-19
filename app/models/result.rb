# payload attribute is stored as base64 format (UTF-8)
class Result < ApplicationRecord
  belongs_to :form
  validates_presence_of :payload
end
