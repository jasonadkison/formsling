class CreateResults < ActiveRecord::Migration[6.0]
  def change
    create_table :results do |t|
      t.references :form, null: false, foreign_key: true
      t.text :payload
      t.timestamps
    end
  end
end
