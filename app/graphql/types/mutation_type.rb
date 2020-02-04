module Types
  class MutationType < Types::BaseObject
      field :create_user, mutation: Mutations::CreateUserMutation
      field :sign_in, mutation: Mutations::SignInMutation
      field :sign_out, mutation: Mutations::SignOutMutation
      field :add_task, mutation: Mutations::AddTaskMutation
      field :complete_task, mutation: Mutations::CompleteTaskMutation
      field :add_time_entry, mutation: Mutations::AddTimeEntryMutation
      field :delete_task, mutation: Mutations::DeleteTaskMutation
  end
end
