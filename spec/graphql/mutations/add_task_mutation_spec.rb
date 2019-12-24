require 'rails_helper'


Rspec.describe Mutations::AddTaskMutation, type: :request do

    let!(:user) {create(:user, username: 'Martina')}

    let!(:assignee) {create(:user, username: 'JD')}

    def query(user_id:)
        %(mutation{
            createTask(
                userId: #{user_id}
                value: 'Test task @JD !oggi #test'
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

    describe '.resolve' do
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
                'value'           => 'Test task @JD !oggi #test',
                'overdue'         => DateTime.tomorrow,
                'category'        => '#test',
                'assignee'        => ['JD'],
                'user'            => { 'id' => user.id.to_s }
            )
        end
    end
end

