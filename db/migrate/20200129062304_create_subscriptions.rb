class CreateSubscriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :subscriptions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :plan_id
      t.string :stripe_id
      t.datetime :current_period_ends_at
      t.boolean :active, default: true
    end
  end
end
