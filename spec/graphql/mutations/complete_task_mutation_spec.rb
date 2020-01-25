require 'rails_helper'
require_relative '../test_helpers'
include GraphQL::TestHelpers
include ActiveSupport::Testing::TimeHelpers

Rspec.describe Mutations::CompleteTaskMutation, type: :mutation do
    subject { described_class }
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance

    let!(:user) {create(:user, username: 'Martina', password: '123456')}

    let!(:task) {create(:task, owner: user, value: 'test task')}
    let(:mutation_type) {"completeTask"}
    let(:mutation_string){
        <<~GQL
            mutation CompleteTaskMutation(
                $completed: Boolean!,
                $id: ID!
            ){
                completeTask(
                    completed: $completed,
                    id: $id
                ){
                    task{
                        id
                        value
                        completed
                        category
                        overdue
                        assignees{
                            id
                            username
                        }
                        owner{
                            id
                            username
                        }
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
            # freeze_time
            mutation(
                mutation_string,
                variables: {
                    # String: {
                        completed: true,
                        id: task.id
                    # }
                },
                context: {current_user: user}
            )
        end

        # after do
            # unfreeze_time
        # end
  
        it 'should return no errors' do
          puts gql_response.errors  
          expect(gql_response.errors).to be_nil
        end
  
        it 'should return the task object' do
          expect(gql_response.data[mutation_type]["task"]).to include(
              "completed" => true
            )
        end
    end

    context 'when a user has not logged in' do
  
        before do
            mutation(
                mutation_string,
                variables: {
                    completed: true,
                    id: task.id
                },
                context: {}
            )
        end
  
        it 'should return errors' do
            hashed_res = gql_response.errors.reduce Hash.new, :merge
            expect(hashed_res["message"]).to eq(
                "You need to authenticate to perform this action"
            )
        end
  
    end
    context 'when a user has not passed required parameters parameters' do
  
        before do
            mutation(
                mutation_string,
                variables: {
                    completed: nil,
                    id: nil
                },
                context: {current_user: user}
            )
        end
  
        it 'should return errors' do
          expect(gql_response.errors).to be_truthy
        end
  
    end
end

