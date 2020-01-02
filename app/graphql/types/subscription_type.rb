# app/graphql/types/subscription_type.rb

module Types
    class SubscriptionType < GraphQL::Schema::Object
      field :task_added, Types::TaskType, null: false, description: "A task was added"
  
      def task_added; end
    end
  end