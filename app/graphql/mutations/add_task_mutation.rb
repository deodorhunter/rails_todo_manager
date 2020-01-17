require 'text_parser'
require 'stats_builder'

module Mutations
    class AddTaskMutation < Mutations::BaseMutation
      argument :value, String, required: true

      field :task, Types::TaskType, null: true
      field :errors, [String], null: false

      def resolve(value:)
        puts context[:current_user]
        if context[:current_user].nil?
          raise GraphQL::ExecutionError,
                "You need to authenticate to perform this action"
        end
        debugger
        parsed_results = TextParser.parse(text: value)
        assignees = parsed_results[:assignees]
        task = Task.new(
          value: value,
          # assignee: parsed_results[:assignee],
          category: parsed_results[:category],
          overdue: parsed_results[:overdue],
          owner: context[:current_user],
          completed: false
        )
        if assignees
          assignees.each do |n|
            # debugger
            n.assigned_tasks << task 
            # task["assignees"] << n
          end
        end
        if task.save
          
          TodoManagerSchema.subscriptions.trigger("taskAdded", {}, task)
          TodoManagerSchema.subscriptions.trigger(
            "statsUpdate",
            {},
            StatsBuilder.build_stats(context[:current_user].id),
            scope: task.owner_id)
          if assignees
            assignees.each do |n|
              TodoManagerSchema.subscriptions.trigger(
                "statsUpdate",
                {},
                StatsBuilder.build_stats(n.id),
                scope: n.id)
              end
          end
          { task: task }
        else
          { errors: task.errors.full_messages }
        end
      end
    end
end