module Mutations
    class AddTimeEntryMutation < Mutations::BaseMutation
      argument :time, Int, required: true
      argument :task_id, String, required: true

      field :time_entry, Types::TimeEntryType, null: false
      field :errors, [String], null: true

      def resolve(time:, task_id:)
        puts context[:current_user]
        if context[:current_user].nil?
            raise GraphQL::ExecutionError,
                "You need to authenticate to perform this action"
        end
        debugger
        time_entry = TimeEntry.new(
            user: context[:current_user],
            task: Task.find(task_id),
            time: time
        )

        if time_entry.save
            # TodoManagerSchema.subscriptions.trigger("taskAdded", {}, task)
            return { time_entry: time_entry}
        else
            { errors: time_entry.errors.full_messages }
        end

      end
    end
end
