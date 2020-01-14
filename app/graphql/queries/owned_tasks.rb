module Queries
    class OwnedTasks < Queries::BaseQuery
        description "Returns a list of an user tasks by owner_id"
        type [Types::TaskType], null: false
        argument :owner_id, ID, required: true

        def resolve(owner_id:)
            user = User.find(owner_id)
            all_tasks = user.tasks.to_a
        end
    end
end