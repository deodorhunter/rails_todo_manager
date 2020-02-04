require 'stats_builder'

module Mutations
    class CompleteTaskMutation < Mutations::BaseMutation
      argument :completed, Boolean, required: true
      argument :id, ID, required: true

      field :task, Types::TaskType, null: true
      field :errors, [String], null: false

      def resolve(completed:, id:)
        puts context[:current_user]
        if context[:current_user].nil?
          raise GraphQL::ExecutionError,
                "You need to authenticate to perform this action"
        end
        # debugger
        task = Task.find(id)
        task.completed = completed

        if task.save
            debugger
            # if task is assigned, notify the user who assigned it
            # TODO: notify all possible assignees
            if task.assignees 
              task.assignees.each do |n|
                TodoManagerSchema.subscriptions.trigger(
                  "statsUpdate",
                  {},
                  StatsBuilder.build_stats(n.id),
                  scope: n.id
                )
              end
            end
            # if task.owner_id != context[:current_user].id
                puts "[CompleteTaskMutation] triggering subscription with scope: #{task.owner_id}"
                TodoManagerSchema.subscriptions.trigger(
                  "taskCompleted",
                  {}, 
                  task, 
                  scope: task.owner_id
                )
                TodoManagerSchema.subscriptions.trigger(
                  "statsUpdate",
                  {},
                  StatsBuilder.build_stats(task.owner_id),
                  scope: task.owner_id
                )
            # end

            { task: task }
        else
            { errors: task.errors.full_messages }
        end
      end
    end
end