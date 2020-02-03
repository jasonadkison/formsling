ActiveAdmin.register User do
  permit_params :role, :first_name, :last_name
  includes :subscription

  index do
    id_column
    column :first_name
    column :last_name
    column :role
    column 'Customer ID', :stripe_id
    column :subscription
    column :created_at
    actions
  end

  form do |f|
    f.semantic_errors
    f.inputs :role, :first_name, :last_name
    f.actions
  end
end
