module Types
    class TimeEntryType < Types::BaseObject
      field :id, String, null: false
      field :user, Types::UserType, null: false
      field :created_at, GraphQL::Types::ISO8601DateTime, null: false
      field :time, Int, null: false
    end
  
end