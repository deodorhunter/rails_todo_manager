module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :tasks,
          [Types::TaskType],
          null: false,
          description: "Returns a list of task in the whole app"

    def tasks
      Task.all
    end

    # field :users, 
    #       [Types::UserType],
    #       null: false,
    #       descritpion: "returns a list of all users"

    # def users
    #   User.all
    # end

  end
end
