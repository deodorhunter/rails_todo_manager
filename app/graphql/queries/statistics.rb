require 'stats_builder'

module Queries
    class Statistics < Queries::BaseQuery
        description 'Returns task statistics for current user'
        type Types::StatisticsType, null: true
    
        argument :user_id, ID, required: true

        def resolve(user_id:)
            debugger
            stats = StatsBuilder.build_stats(user_id)
            return stats

        end

    end
end


