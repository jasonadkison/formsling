ActiveAdmin.register Result do
  actions :index, :show
  includes :form

  index do
    id_column
    column :user do |result|
      result.user
    end
    column :form
    column :processed
    column :created_at
    actions
  end
end
