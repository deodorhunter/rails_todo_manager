module Types
    class StatisticsType < Types::BaseObject
    #   field :id, ID, null: false
      
      field :completed_count, Int, null: true
      field :total_count, Int, null: true
      field :categories, [Types::CategoryStatsType], null: true
    end
  
  end
  