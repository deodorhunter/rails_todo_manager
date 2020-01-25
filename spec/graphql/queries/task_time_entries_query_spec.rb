require "rails_helper"
require_relative "../test_helpers"
include GraphQL::TestHelpers
include ActiveSupport::Testing::TimeHelpers

RSpec.describe Queries::TaskTimeEntriesQuery, type: :query do
  describe "find query details" do
    let(:user){create(:user)}
    let(:task){create(:task, owner: user)}
    let(:time_entries){[
        create(:time_entry, user: user, task: task),
        create(:time_entry, user: user, task: task)
    ]}
    let(:query_string){
        %(query TaskTimeDetails($taskId: ID!, $userId: ID!) {
            taskTimeDetails(taskId: $taskId, userId: $userId) {
              
              timeEntries{
                  user{
                      id
                      username
                  }
                  createdAt
                  time
              }
            }
          })
    }
    before do
        freeze_time
        query(
            query_string,
            variables:{
                "userId": user.id,
                "taskId": task.id
            },
            context:{
                current_user: user
            }
        )
    end

    after do
        unfreeze_time
    end

    it "does not have any errors" do
        debugger
        expect(gql_response.errors).to be_nil
    end

  end
end