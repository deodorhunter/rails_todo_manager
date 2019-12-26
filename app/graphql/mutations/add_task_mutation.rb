module Mutations
    class AddTaskMutation < Mutations::BaseMutation
      argument :value, String, required: true
      argument :overdue, GraphQL::Types::ISO8601DateTime, required: false

      field :task, Types::TaskType, null: true
      field :errors, [String], null: false

      def resolve(value:)
        if context[:current_user].nil?
          raise GraphQL::ExecutionError,
                "You need to authenticate to perform this action"
        end

        category = value.match(/#(\w+)/)
        assignee = value.match(/@(\w+)/)
        overdue = value.match(/!(\w+)/)

        task = Task.new(
          value: value,
          description: description,
          image_url: image_url,
          user: context[:current_user]
        )

        if task.save
          { task: task }
        else
          { errors: task.errors.full_messages }
        end
      end
    end
end