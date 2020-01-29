FactoryBot.define do
  factory :user do
    first_name { 'John' }
    last_name { 'Doe' }
    email { 'JohnDoe@example.com' }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
