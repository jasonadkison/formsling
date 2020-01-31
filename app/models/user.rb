class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :async

  has_many :forms, dependent: :delete_all
  has_one :subscription, dependent: :destroy

  enum role: [:member, :admin]

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :stripe_id, presence: true, on: :update

  # Set the defaults for new users
  after_initialize do
    self.role ||= :member if self.new_record?
  end

  # Sync the User with the stripe customer when these attributes change.
  after_update :sync_user_with_customer

  # Stop any existing subscription if the user is destroyed
  after_destroy do
    DeleteStripeCustomerJob.perform_later(stripe_id)
  end

  def active_subscription?
    subscription && subscription.active?
  end

  def full_name
    "#{first_name} #{last_name}"
  end

  private

  def sync_user_with_customer
    return unless saved_change_to_first_name? || saved_change_to_last_name? || saved_change_to_email?

    UpdateStripeCustomerForUserJob.perform_later(id)
  end
end
