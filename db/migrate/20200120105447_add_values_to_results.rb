class AddValuesToResults < ActiveRecord::Migration[6.0]
  def change
    add_column :results, :values, :text
  end
end
