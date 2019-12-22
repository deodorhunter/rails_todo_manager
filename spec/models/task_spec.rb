# spec/task_test.rb

require "rails_helper"
require "task"

RSpec.describe Task do

    # add fixture/factory
    let(:user){
        create(:user)
    }
    let(:task){
        create(:task, user: user)
    }

    it { should belong_to(:user)}
    # describe 'email is present' do
    it{ should validate_presence_of(:value) }
    # end    
    # describe 'username is present' do
    # end 
    # describe 'password is present' do
    #     it{ should validate_presence_of(:password) }
    # end    
end