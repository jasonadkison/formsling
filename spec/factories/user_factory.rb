require 'faker'

FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    sequence :email do |n|
      Faker::Internet.email(name: "#{first_name} #{last_name} #{n}")
    end
    password { 'password' }
    password_confirmation { 'password' }
  end

  factory :stripe_user, parent: :user do
    sequence :stripe_id do |n|
      "cus_#{n}"
    end
  end
end
