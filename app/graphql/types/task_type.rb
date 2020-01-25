module Types
  class TaskType < Types::BaseObject
    field :id, ID, null: false
    field :value, String, null: false
    field :completed, Boolean, null: false
    field :overdue, GraphQL::Types::ISO8601DateTime, null: true
    field :assignees, [Types::UserType], null: true
    field :category, String, null: true
    field :owner, Types::UserType, null: false
    field :timeEntries, [Types::TimeEntryType], null: true
  end

end
