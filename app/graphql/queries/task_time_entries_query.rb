module Queries
    class TaskTimeEntriesQuery < Queries::BaseQuery
        description 'Returns ttime entries details for a task'
        type Types::TaskType, null: true
    
        argument :user_id, ID, required: true
        argument :task_id, ID, required: true

        def resolve(task_id:, user_id:)
            task = Task.find(task_id)
            # if we want to return only user related time entries
            # task.time_entries.select {|te| te.user_id == u.id }
            # then construct a TaskType object and return it
            # return task
        end

    end
end