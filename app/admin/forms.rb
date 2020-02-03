ActiveAdmin.register Form do
  permit_params :user_id, :name, :url, :email_recipient, :payload, :published
  includes :user

  index do
    id_column
    column :user
    column :name
    column :email_recipient
    column :published
    actions
  end

  form do |f|
    f.semantic_errors

    f.inputs :user_id, :name, :url, :email_recipient, :payload, :published

    f.actions
  end
end
