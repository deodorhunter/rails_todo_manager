class SetTextNotNullableTask < ActiveRecord::Migration[6.0]
  def change
    change_column :tasks, :value, :text, null: false
  end
end
