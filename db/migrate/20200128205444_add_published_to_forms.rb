class AddPublishedToForms < ActiveRecord::Migration[6.0]
  def change
    add_column :forms, :published, :boolean, default: false
  end
end
