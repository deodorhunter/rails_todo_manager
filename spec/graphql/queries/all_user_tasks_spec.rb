# spec/graphql/types/query_type_spec.rb
require "rails_helper"
require_relative "../test_helpers"
include GraphQL::TestHelpers
include ActiveSupport::Testing::TimeHelpers

RSpec.describe Queries::AllUserTasks, type: :query do
  describe "find all user tasks, owned and assigned" do
    before do
        freeze_time
    end
    after do
        unfreeze_time
    end

    let!(:assignee) {create(:user, username: 'Martina', email: 'martina@example.com')}
    let!(:owner) {create(:user)}
    let!(:tasks) { 
        [
          create(:task,  owner: owner, value: 'Test owned task @JD !domani #test', category: '#test'),
          create(:task, assignee: assignee, owner: owner, value: 'Test assigned task @JD !domani #test', category: '#test')
        ] 
    }
    let(:query_type) {"allUserTasks"}
    let(:query_string){
      %(query AllUserTasks($userId: ID!) {
        allUserTasks(userId: $userId) {
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
        userId: owner.id
      })
    end
    it "returns value correctly" do 
      # can't make this test succeed, query fucking works as expected
      # stupid matchers look for order of keys, 0 sbatta to make custom matcher        
      expect(gql_response.data[query_type]).to include(
        {
            'id'              => tasks[0].id,
            'category'        => '#test',     
            'value'           => 'Test owned task @JD !domani #test',
            'overdue'         => 1.day.from_now.iso8601,
            'owner'           => owner.as_json(except: 
                                    ['email','password_digest', 'created_at', 'updated_at']
                                ),
                           
        },
        {
            'id'              => tasks[1].id,
            'assignee'        => assignee.as_json(except: 
                                    ['email','password_digest', 'created_at', 'updated_at']
                                ),
            'category'        => '#test',  
            'value'           => 'Test assigned task @JD !domani #test',
            'overdue'         => 1.day.from_now.iso8601,                  
            'owner'           => owner.as_json(except: 
                                    ['email','password_digest', 'created_at', 'updated_at']
                                )
        },
      )
    end
   
  end
end