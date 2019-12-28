# spec/graphql/types/query_type_spec.rb
require "rails_helper"
require_relative "../test_helpers"
include GraphQL::TestHelpers

RSpec.describe Queries::OwnedTasks, type: :query do
  describe "find all owned tasks" do
    let!(:user) {create(:user, username: 'Martina', email: 'martina@example.com')}
    let!(:owner) {create(:user)}
    let!(:tasks) { 
      create(:task, assignee: user, owner: owner, value: 'Test task @JD !domani #test', category: '#test') 
    }
    let(:query_type) {"ownedTasks"}
    let(:query_string){
      %(query MyTasks($ownerId: ID!) {
        ownedTasks(ownerId: $ownerId) {
          id
          value
          overdue
          category
          assignee{
            id
            username
          }
          owner{
            id
            username
          }
        }
      })
    }

    before do
      query(query_string, variables:{
        ownerId: owner.id
      })
    end
    it "returns value correctly" do        
      expect(gql_response.data[query_type]).to eq([{
        'id'              => tasks.id,
        'value'           => 'Test task @JD !domani #test',
        'overdue'         => 1.day.from_now.iso8601,
        'category'        => '#test',
        'assignee'        => user.as_json(except: 
                                ['email','password_digest', 'created_at', 'updated_at']
                              ),
        'owner'           => owner.as_json(except: 
                                ['email','password_digest', 'created_at', 'updated_at']
                              )
      }])
    end
   
  end
end