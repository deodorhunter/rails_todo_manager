FactoryBot.define do
    factory :time_entry do
      time {rand(60...36000)}
      association :user, factory: :user
      association :task, factory: :task
      # association :assignees, factory: :user
      # after(:create){ |task| task.assignees << FactoryBot.create(:user)}
    end
end