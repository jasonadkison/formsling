ActiveAdmin.register Subscription do
  actions :index, :show

  index do
    id_column
    column :user
    column 'Customer ID' do |subscription|
      subscription.user.stripe_id
    end
    column 'Plan ID', :plan_id
    column 'Subscription ID', :stripe_id
    column :status
    column :created_at
    actions
  end

  show do |subscription|
    attributes_table do
      row :user
      row 'Plan ID', &:plan_id
      row 'Subscription ID', &:stripe_id
      row :status
      row :created_at
      row :updated_at
    end

    panel 'User' do
      attributes_table_for subscription.user do
        row :id
        row :first_name
        row :last_name
        row :email
        row 'Customer ID', &:stripe_id
      end
    end

    active_admin_comments
  end

end
