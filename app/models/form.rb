class Form < ApplicationRecord
  belongs_to :user
  has_many :results, dependent: :delete_all

  validates :name, presence: true
  validates :user, presence: true
  validates :payload, presence: true

  def email_recipient
    [super, user.email].reject(&:blank?).first
  end
end
