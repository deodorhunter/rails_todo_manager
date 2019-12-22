FactoryBot.define do
    factory :user do
      # Use sequence to make sure that the value is unique
      sequence(:email) { |n| "user-#{n}@example.com" }
      sequence(:username) { |n| "user-#{n}" }
      password {'admin'}
    end
end