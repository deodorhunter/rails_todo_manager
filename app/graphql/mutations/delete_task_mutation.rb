module Mutations
    class DeleteTaskMutation < Mutations::BaseMutation
      argument :task_id, String, required: true

      field :deleted_task, Types::TaskType, null: true
      field :errors, [String], null: false

      def resolve(task_id:)
        puts context[:current_user]
        if context[:current_user].nil?
          raise GraphQL::ExecutionError,
                "You need to authenticate to perform this action"
        end
        debugger
        task = Task.find(task_id)
        assignees = task.assignees
        if task.owner.id != context[:current_user].id
            raise GraphQL::ExecutionError,
                "You are not allowed to perform this action, only the task's owner can delete this task"
        end
       
        if task.destroy
          
          TodoManagerSchema.subscriptions.trigger(
            "taskDeleted",
            {},
            task,
            scope: task.owner_id
          )
          TodoManagerSchema.subscriptions.trigger(
            "statsUpdate",
            {},
            StatsBuilder.build_stats(context[:current_user].id),
            scope: task.owner_id
          )
          if assignees
            assignees.each do |n|
              TodoManagerSchema.subscriptions.trigger(
                "statsUpdate",
                {},
                StatsBuilder.build_stats(n.id),
                scope: n.id
              )
              TodoManagerSchema.subscriptions.trigger(
                "taskDeleted",
                {},
                task,
                scope: n.id
              )
            end
          end
           # this causes ActiveRecord error, calling task triggers a refetch from db, and task is deleted at this point of code. Find a way
          { deleted_task: task }
        else
          { errors: task.errors.full_messages }
        end
      rescue ActiveRecord::RecordNotFound
        puts 'delete task mutation'
    
      end
    end
end