FactoryBot.define do
    factory :task do
      user
      overdue {Date.tomorrow}
      value {'Capire Ruby !10giorni @user2 #rubyonrails'}
      assignee {['user2']}
      category {'rubyonrails'}
    end
end