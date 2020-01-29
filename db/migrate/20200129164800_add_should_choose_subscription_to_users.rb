class AddShouldChooseSubscriptionToUsers < ActiveRecord::Migration[6.0]
  def up
    add_column :users, :should_choose_subscription, :boolean, default: true
    User.all.find_each { |u| u.update(should_choose_subscription: false) }
  end

  def down
    remove_column :users, :should_choose_subscription
  end
end
