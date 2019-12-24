require "rails_helper"

RSpec.describe Types::UserType do
    subject { described_class }
    # avail type definer in our tests
    types = GraphQL::Define::TypeDefiner.instance
    it 'has an :id field of ID type' do
      # Ensure that the field id is of type ID
      expect(subject).to have_field(:id).of_type(!types.ID)
    end
  
    it 'has a :username field of String type' do
      # Ensure the field is of String type
      expect(subject).to have_field(:username).of_type(!types.String)
    end

    it 'has a :email field of String type' do
        # Ensure the field is of String type
        expect(subject).to have_field(:email).of_type(!types.String)
      end
end