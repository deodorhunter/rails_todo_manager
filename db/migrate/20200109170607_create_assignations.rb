class CreateAssignations < ActiveRecord::Migration[6.0]
  def change
    create_table :assignations, id: :uuid do |t|
      t.references 
    end
  end
end
