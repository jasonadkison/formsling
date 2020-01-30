class AddTrialFieldsToSubscriptions < ActiveRecord::Migration[6.0]
  def change
    add_column :subscriptions, :trial_starts_at, :datetime
    add_column :subscriptions, :trial_ends_at, :datetime
  end
end
