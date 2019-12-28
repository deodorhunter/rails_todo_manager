require "rails_helper"
require_relative "../test_helpers"
include GraphQL::TestHelpers

RSpec.describe Queries::Users, type: :query do
    describe "find all users" do
        let!(:user) {create(:user, username: 'Martina', email: 'martina@example.com')}

        let(:query_type) {"users"}
        let(:query_string){
        %(query {
            users {
                id
                username
                email
            }
        })
        }

        before do
        query(query_string)
        end

        it "returns values correctly" do
            expect(gql_response.data[query_type]).to include({
                "id"            => user.id,
                "username"      => user.username,
                "email"         => user.email
        })
        end
    end

end
