class AddPayloadToForms < ActiveRecord::Migration[6.0]
  def change
    add_column :forms, :payload, :text
  end
end
