module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :tasks,
          [Types::TaskType],
          null: false,
          description: "Returns a list of task in the whole app"

    def tasks
      # tasks = Task.find_by_sql("select t.*,  jsonb_object_agg(u.id, to_jsonb(u) - 'password') as assignee from tasks as t left join users u on u.id=t.assignee group by t.id")
      # puts tasks.to_json
      # puts tasks.inspect
      # return tasks
      Task.all
    end

    field :users, 
          [Types::UserType],
          null: false,
          description: "returns a list of all users"

    def users
      User.all
    end

    field :me, Types::UserType, description: "Returns current logged user", null: true

    def me
      context[:current_user]
    end

  end
end
