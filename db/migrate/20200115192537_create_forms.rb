class CreateForms < ActiveRecord::Migration[6.0]
  def change
    create_table :forms do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name
      t.text :url
      t.string :email_recipient
      t.text :redirect_url

      t.timestamps
    end
  end
end
