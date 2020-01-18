class AddProcessedToResults < ActiveRecord::Migration[6.0]
  def change
    add_column :results, :processed, :boolean, default: false
  end
end
