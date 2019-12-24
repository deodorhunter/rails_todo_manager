# spec/graphql/types/query_type_spec.rb
require "rails_helper"

RSpec.describe Types::QueryType do
  describe "tasks" do
    let!(:user) {create(:user, username: 'Martina', email: 'martina@example.com')}
    let!(:owner) {create(:user)}
    let!(:tasks) { 
      create(:task, assignee: user, owner: owner, value: 'Test task @JD !domani #test', category: '#test') 
    }
   

    let(:query) do
      %(query {
        tasks {
          id
          value
          overdue
          category
          assignee{
            id
            username
            email
          }
          owner{
            id
            username
            email
          }
        }
      })
    end

    subject(:result) do
      TodoManagerSchema.execute(query).as_json
    end

    # Task.find_by_sql("select t.*, jsonb_agg(to_jsonb(u) - 'password') as assignee from tasks as t left join users u on u.id::varchar = any(t.assignee) group by t.id")

  
    it "returns value correctly" do        
      expect(result.dig("data", "tasks")).to eq([{
        'id'              => tasks.id,
        'value'           => 'Test task @JD !domani #test',
        'overdue'         => 1.day.from_now.iso8601,
        'category'        => '#test',
        'assignee'        => user.as_json(except: ['password', 'created_at', 'updated_at']),
        'owner'           => owner.as_json(except: ['password', 'created_at', 'updated_at'])
      }])
    end
   
  end
end