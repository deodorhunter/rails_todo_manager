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
        # curly brances needed or else expression will be evaluated immediatly and will raise error
        expect{create(:user, email: user.email)}.to raise_error
    end    
    it 'username is unique' do
        # curly brances needed or else expression will be evaluated immediatly and will raise error
        expect{create(:user, username: user.username)}.to raise_error
    end 
    it { should have_many(:tasks)}
   
end