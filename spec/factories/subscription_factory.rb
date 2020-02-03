FactoryBot.define do
  factory :subscription do
    user
    sequence :stripe_id do
      |n| "sub_#{n}"
    end
    sequence :plan_id do
      |n| "plan_#{n}"
    end
    current_period_ends_at { 30.days.from_now }
    trial_starts_at { DateTime.now }
    trial_ends_at { 30.days.from_now }
  end
end
