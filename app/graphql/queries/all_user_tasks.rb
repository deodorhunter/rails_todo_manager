module Queries
    class AllUserTasks < Queries::BaseQuery
        description 'Returns all tasks assigned or owned by user by user_id'
        type [Types::TaskType], null: false
    
        argument :user_id, ID, required: true

        def resolve(user_id:)
            Task.where(owner_id: user_id)
                .or(Task.where(assignee_id: user_id))
                .order(created_at: :desc)
        end

    end
end