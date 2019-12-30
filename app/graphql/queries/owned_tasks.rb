module Queries
    class OwnedTasks < Queries::BaseQuery
        description "Returns a list of an user tasks by owner_id"
        type [Types::TaskType], null: false
        argument :owner_id, ID, required: true

        def resolve(owner_id:)
            Task.where(owner_id: owner_id)
                .order(created_at: :desc)
        end
    end
end