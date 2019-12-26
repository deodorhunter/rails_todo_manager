# spec/task_test.rb

require "rails_helper"
require "task"

RSpec.describe Task do

    # add fixture/factory
    let(:task){
        owner = create(:user)
        assignee = create(:user)
        create(:task, owner: owner, assignee: assignee)
    }
    
    
    it 'should have an owner' do
        should belong_to(:owner)
    end
    it 'can have an assignee assignee' do
        should belong_to(:assignee).optional
    end
    # describe 'email is present' do
    it 'task value must be present' do
        should validate_presence_of(:value)
    end
    # end    
    # describe 'username is present' do
    # end 
    # describe 'password is present' do
    #     it{ should validate_presence_of(:password) }
    # end    
end