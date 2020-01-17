# app/graphql/types/subscription_type.rb

module Types
    class SubscriptionType < GraphQL::Schema::Object
      field :task_added, Types::TaskType, 
        null: false, 
        description: "A task was added"
      field :task_completed, Types::TaskType,
        null: false,
        description: "An assigned task was completed",
        subscription_scope: :current_user_id
      field :stats_update, Types::StatisticsType,
        null: false,
        description: "Stats need to be updated after task addition/completion",
        subscription_scope: :current_user_id
        
      def task_added 
      end
      def task_completed
      end
      def stats_update
      end
    end
  end