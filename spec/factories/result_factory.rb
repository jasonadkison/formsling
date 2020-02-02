FactoryBot.define do
  factory :result do
    form
    sequence :payload do |n|
      "payload-#{n}"
    end
    sequence :values do |n|
      "values-#{n}"
    end
  end
end
