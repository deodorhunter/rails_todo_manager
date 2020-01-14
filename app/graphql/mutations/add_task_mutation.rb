require 'text_parser'

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
        # debugger
        parsed_results = TextParser.parse(text: value)

        task = Task.new(
          value: value,
          # assignee: parsed_results[:assignee],
          category: parsed_results[:category],
          overdue: parsed_results[:overdue],
          owner: context[:current_user],
          completed: false
        )

        if task.save
          task.assignees = parsed_results[:assignees]
          if task.save
            TodoManagerSchema.subscriptions.trigger("taskAdded", {}, task)
            { task: task }
          else
            { errors: task.errors.full_messages }
          end

        else
          { errors: task.errors.full_messages }
        end
      end
    end
end