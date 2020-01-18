class Result < ApplicationRecord
  belongs_to :form
  validates_presence_of :payload
end
