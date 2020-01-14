module Queries
    class AllUserTasks < Queries::BaseQuery
        description 'Returns all tasks assigned or owned by user by user_id'
        type [Types::TaskType], null: false
    
        argument :user_id, ID, required: true

        def resolve(user_id:)
            # Task.where(owner_id: user_id)
            #     .or(Task.where(assignee_id: user_id))
            #     .order(created_at: :desc)
            user = User.find(user_id)
            
            all_tasks = user.assigned_tasks.to_a + user.tasks.to_a
            # puts all_tasks
        end

    end
end