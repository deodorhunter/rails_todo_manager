require 'rails_helper'
require_relative '../test_helpers'
include GraphQL::TestHelpers
include ActiveSupport::Testing::TimeHelpers

Rspec.describe Mutations::DeleteTaskMutation, type: :mutation do
    subject { described_class }
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance

    let!(:user) {create(:user, username: 'Martina', password: '123456')}
    let!(:user2) {create(:user, username: "Gino", password: '123456')}
    let!(:task) {create(:task, owner: user)}

    let(:mutation_type) {"deleteTask"}
    let(:mutation_string){
        <<~GQL
            mutation DeleteTaskMutation(
                $taskId: String!
            ){
                deleteTask(
                    taskId: $taskId
                ){
                    deletedTask{
                        id
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
  
        it 'should return the deletedTask object' do
          expect(gql_response.data[mutation_type]["deletedTask"]).to include(
                "id"    => task.id,
            )
        end
    end

    context "when user is not allowed to delete task (is not owner)" do
        before do
            freeze_time
            mutation(
                mutation_string,
                variables:{
                    "taskId": task.id,
                },
                context:{
                    current_user: user2
                }
            )
        end

        after do
            unfreeze_time
        end

        it "should return error" do
            expect(gql_response.errors).to be_truthy
        end

    end
end