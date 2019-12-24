module Mutations
    class AddTaskMutation < Mutations::BaseMutation
      # argument :value, String, required: true
      # argument :overdue, GraphQL::Types::ISO8601DateTime, required: false
      # argument :image_url, String, required: false

      # field :item, Types::ItemType, null: true
      # field :errors, [String], null: false

      # def resolve(title:, description: nil, image_url: nil)
      #   if context[:current_user].nil?
      #     raise GraphQL::ExecutionError,
      #           "You need to authenticate to perform this action"
      #   end

      #   item = Item.new(
      #     title: title,
      #     description: description,
      #     image_url: image_url,
      #     user: context[:current_user]
      #   )

      #   if item.save
      #     { item: item }
      #   else
      #     { errors: item.errors.full_messages }
      #   end
      # end
    end
end