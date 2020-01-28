class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :async

  has_many :forms, dependent: :delete_all

  enum role: [:member, :admin]

  # Set the default role for new users
  after_initialize do
    self.role ||= :member if self.new_record?
  end

  validates :first_name, presence: true
  validates :last_name, presence: true
end
