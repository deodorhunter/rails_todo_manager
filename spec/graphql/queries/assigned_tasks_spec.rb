# spec/graphql/types/query_type_spec.rb
require "rails_helper"
require_relative "../test_helpers"
include GraphQL::TestHelpers

RSpec.describe Queries::AssignedTasks, type: :query do
  describe "find all owned tasks" do
    let!(:assignee) {create(:user, username: 'Martina', email: 'martina@example.com')}
    let!(:owner) {create(:user)}
    let!(:tasks) { 
      create(:task, assignee: assignee, owner: owner, value: 'Test assigned task @JD !domani #test', category: '#test') 
    }
    let(:query_type) {"assignedTasks"}
    let(:query_string){
      %(query AssignedTasks($assigneeId: ID!) {
        assignedTasks(assigneeId: $assigneeId) {
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
        assigneeId: assignee.id
      })
    end
    it "returns value correctly" do        
      expect(gql_response.data[query_type]).to eq([{
        'id'              => tasks.id,
        'value'           => 'Test assigned task @JD !domani #test',
        'overdue'         => 1.day.from_now.iso8601,
        'category'        => '#test',
        'assignee'        => assignee.as_json(except: 
                                ['email','password_digest', 'created_at', 'updated_at']
                              ),
        'owner'           => owner.as_json(except: 
                                ['email','password_digest', 'created_at', 'updated_at']
                              )
      }])
    end
   
  end
end