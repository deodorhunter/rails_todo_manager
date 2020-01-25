require 'rails_helper'
require_relative '../test_helpers'
include GraphQL::TestHelpers
include ActiveSupport::Testing::TimeHelpers

Rspec.describe Mutations::AddTimeEntryMutation, type: :mutation do
    subject { described_class }
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance

    let!(:user) {create(:user, username: 'Martina', password: '123456')}

    let!(:task) {create(:task, owner: user)}

    let(:mutation_type) {"addTimeEntry"}
    let(:mutation_string){
        <<~GQL
            mutation AddTimeEntryMutation(
                $time: Int!
                $taskId: String!
            ){
                addTimeEntry(
                    time: $time
                    taskId: $taskId
                ){
                    timeEntry{
                        user{
                            id
                            username
                        }
                        time
                        createdAt
                    }
                }
            }
        GQL
    }

    # subject(:result) do
        # TodoManagerSchema.execute(query(), context: {current_user: user}).as_json
    #   end   
  
    context 'when a user has all the required permissions and parameters' do
       
        before do
            freeze_time
            mutation(
                mutation_string,
                variables:{
                    "taskId": task.id,
                    "time": 360
                },
                context:{
                    current_user: user
                }
            )
        end

        after do
            unfreeze_time
        end
  
        it 'should return no errors' do

          puts gql_response.errors  
          debugger
          expect(gql_response.errors).to be_nil
        end
  
        it 'should return the timeEntry object' do
          expect(gql_response.data[mutation_type]["timeEntry"]).to include(
                "time"      =>  360,
                "user"      =>  user.as_json(except: 
                                    ['email','password_digest', 'created_at', 'updated_at']
                                ),
                "createdAt" =>  Time.now
            )
        end
    end
end