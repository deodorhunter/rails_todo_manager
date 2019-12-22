# spec/graphql/types/query_type_spec.rb
require "rails_helper"

RSpec.describe Types::QueryType do
  describe "items" do
    let!(:task) { create_pair(:task) }

    let(:query) do
      %(query {
        tasks {
          value
        }
      })
    end

    subject(:result) do
      TodoManagerSchema.execute(query).as_json
    end

    it "returns all tasks" do
      expect(result.dig("data", "tasks")).to match_array(
        task.map { |item| { "value" => item.value } }
      )
    end
  end
end