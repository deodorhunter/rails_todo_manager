require 'rails_helper'


Rspec.describe Mutations::AddTaskMutation, type: :request do
    subject { described_class }
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance

    let!(:user) {create(:user, username: 'Martina')}

    let!(:assignee) {create(:user, username: 'JD')}
    
    def query(user_id:)
        %(mutation{
            createTask(
                userId: #{user_id}
                value: 'Test task @JD !tomorrow #test'
            ){
                id
                value
                completed
                category
                overdue
                assignee
                user
            }
        })
    end

    subject(:result) do
        TodoManagerSchema.execute(query(user_id: user.id)).as_json
      end


    
  
    describe 'add a task' do
        it 'creates a task' do
            expect do
                post '/graphql', params: { query: query(user_id: user.id) }
            end.to change { Task.count }.by(1)
        end

        it 'returns a task' do
    
            post '/graphql', params: { query: query(user_id: user.id) }
            json = JSON.parse(response.body)
            data = json['data']['createTask']
    
            expect(data).to include(
                'id'              => be_present,
                'value'           => 'Test task @JD !tomorrow #test',
                'overdue'         => DateTime.tomorrow,
                'category'        => '#test',
                'assignee'        => assignee,
                'user'            => user
            )
        end
    end
end

