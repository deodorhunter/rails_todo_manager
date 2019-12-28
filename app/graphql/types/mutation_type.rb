module Types
  class MutationType < Types::BaseObject
      field :create_user, mutation: Mutations::CreateUserMutation
      field :sign_in, mutation: Mutations::SignInMutation
      field :add_task, mutation: Mutations::AddTaskMutation
  end
end
