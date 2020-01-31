class AddPaymentMethodToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :payment_method_id, :string
    add_column :users, :payment_method_last4, :string
  end
end
