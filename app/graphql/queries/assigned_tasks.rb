module Queries
    class AssignedTasks < Queries::BaseQuery
        description 'Returns all tasks assigned to user by assignee_id'
        type [Types::TaskType], null: false
    
        argument :assignee_id, ID, required: true

        def resolve(assignee_id:)
            Task.where(assignee_id: assignee_id)
        end

    end
end
