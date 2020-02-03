class AddTimestampsToSubscriptions < ActiveRecord::Migration[6.0]
  def up
    add_timestamps :subscriptions, null: true
    now = Time.zone.now
    update "update subscriptions set created_at = '#{now}'"
    update "update subscriptions set updated_at = '#{now}'"
    change_column_null :subscriptions, :created_at, false
    change_column_null :subscriptions, :updated_at, false
  end

  def down
    remove_timestamps :subscriptions
  end
end
