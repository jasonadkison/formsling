class RemoveShouldChooseSubscriptionFromUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :should_choose_subscription
  end
end
