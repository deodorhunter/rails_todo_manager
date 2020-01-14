FactoryBot.define do
    factory :task do
      overdue {1.day.from_now}
      value {'Capire Ruby !10giorni @user2 #rubyonrails'}
      category {'rubyonrails'}
      association :owner, factory: :user
      association :assignees, factory: :user
      after(:create){ |task| task.assignees << FactoryBot.create(:user)}
    end
end