# spec/task_test.rb

require "rails_helper"
require "task"

RSpec.describe Task do

    # add fixture/factory
    let(:owner){
        create(:user)
        puts 'owner'
        puts owner
    }
    let(:assignee){
        create(:user)
        puts assignee
    }
    let(:task){
        create(:task, owner: owner, assignee: assignee)
        puts task.inspect
    }
    
    
    it { should belong_to(:owner)}
    # describe 'email is present' do
    it{ should validate_presence_of(:value) }
    # end    
    # describe 'username is present' do
    # end 
    # describe 'password is present' do
    #     it{ should validate_presence_of(:password) }
    # end    
end