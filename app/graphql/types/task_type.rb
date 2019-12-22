module Types
  class TaskType < Types::BaseObject
    field :id, ID, null: false
    field :value, String, null: false
    field :completed, String, null: false
    field :overdue, GraphQL::Types::ISO8601DateTime, null: true
    field :assignee, [String], null: true
    field :category, String, null: true
    field :user, Types::UserType, null: false
  end
end
