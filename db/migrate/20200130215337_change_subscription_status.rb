class ChangeSubscriptionStatus < ActiveRecord::Migration[6.0]
  def change
    remove_column :subscriptions, :active

    add_column :subscriptions, :status, :integer
  end
end
