require 'rails_helper'
require_relative '../test_helpers'
include GraphQL::TestHelpers
include ActiveSupport::Testing::TimeHelpers

Rspec.describe Mutations::AddTaskMutation, type: :mutation do
    subject { described_class }
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance

    let!(:user) {create(:user, username: 'Martina')}

    let!(:assignee) {create(:user, username: 'JD')}
    let(:mutation_type) {"addTask"}
    let(:mutation_string){
        <<~GQL
            mutation AddTaskMutation(
                $value: String!
            ){
                addTask(
                    value: $value
                ){
                    task{
                        id
                        value
                        completed
                        category
                        overdue
                        assignee{
                        id
                        username
                        email
                        }
                        owner{
                        id
                        email
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
            freeze_time
            mutation(
                mutation_string,
                variables: {
                    # String: {
                        value: "Test task @JD !tomorrow #test"
                    # }
                },
                context: {current_user: user}
            )
        end

        after do
            unfreeze_time
        end
  
        it 'should return no errors' do
          puts gql_response.errors  
          expect(gql_response.errors).to be_nil
        end
  
        it 'should return the task object' do
          expect(gql_response.data[mutation_type]["task"]).to include(
              "value" => "Test task @JD !tomorrow #test"
            )
        end
    end

    context 'when a user has not logged in' do
  
        before do
            mutation(
                mutation_string,
                variables: {
                    value: "Test task @JD !tomorrow #test"
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
                    value: nil
                },
                context: {current_user: user}
            )
        end
  
        it 'should return errors' do
          expect(gql_response.errors).to be_truthy
        end
  
    end
end

