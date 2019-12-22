# spec/user_test.rb

require "rails_helper"
require "user"

RSpec.describe User do

    # add fixture/factory
    let(:user) {
        create(:user)
        # puts user.inspect
    }
    describe 'email is present' do
        it{ should validate_presence_of(:email) }
    end    
    describe 'username is present' do
        it{ should validate_presence_of(:username) }
    end 
    describe 'password is present' do
        it{ should validate_presence_of(:password) }
    end    
    it 'email is unique' do
        user2 = build(:user, email: user.email)
        puts user.inspect
        puts user2.inspect
        expect(user2).to_not be_valid
    end    
    it 'username is unique' do
        user2 = build(:user, username: user.username)
        expect(user2).to_not be_valid
    end 
    it { should have_many(:tasks)}
   
end