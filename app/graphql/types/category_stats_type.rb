module Types
    class CategoryStatsType < Types::BaseObject
      field :category, String, null: true 
      field :category_total, Int, null: true
      field :category_completed, Int, null: true
      field :percentage, Float, null: true
    end
  
  end
  