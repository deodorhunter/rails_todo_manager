require "rails_helper"

RSpec.describe Types::TaskType do
    subject { described_class }
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance
    it 'has an :id field of ID type' do
      expect(subject).to have_field(:id).of_type(!types.ID)
    end
  
    it 'has a :value field of String type' do
      expect(subject).to have_field(:value).of_type(!types.String)
    end

    it 'has a :category field of String type' do
        expect(subject).to have_field(:category).of_type(types.String)
      end

    it 'has a :assignee field of User type' do
        expect(subject).to have_field(:assignee).of_type(Types::UserType)
    end

    it 'has a :overdue field of DateTime type' do
        expect(subject).to have_field(:overdue).of_type(GraphQL::Types::ISO8601DateTime)
    end

    it 'has a :completed field of Boolean type' do
        expect(subject).to have_field(:completed).of_type(!types.Boolean)
    end

    it 'has a :owner field of User type' do
        expect(subject).to have_field(:owner).of_type("User!")
    end

    
end