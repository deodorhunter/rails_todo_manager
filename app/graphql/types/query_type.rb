module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :allUserTasks, resolver: Queries::AllUserTasks
    field :assignedTasks, resolver: Queries::AssignedTasks
    field :ownedTasks, resolver: Queries::OwnedTasks
    field :users, resolver: Queries::Users

    field :me, Types::UserType, description: "Returns current logged user", null: true
    def me
      # debugger
      context[:current_user]
    end

  end
end
