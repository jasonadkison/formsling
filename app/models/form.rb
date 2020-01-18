class Form < ApplicationRecord
  belongs_to :user
  has_many :results
end
