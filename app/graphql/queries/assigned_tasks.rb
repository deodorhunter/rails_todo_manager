module Queries
    class AssignedTasks < Queries::BaseQuery
        description 'Returns all tasks assigned to user by assignee_id'
        type [Types::TaskType], null: false
    
        argument :assignee_id, ID, required: true

        def resolve(assignee_id:)
            user = User.find(assignee_id)
            all_tasks = user.assigned_tasks.to_a
        end

    end
end
