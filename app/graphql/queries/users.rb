module Queries
    class Users < Queries::BaseQuery
        description "Returns a list of all users"
        type [Types::UserType], null: false

        def resolve()
            User.all
        end
    end
end