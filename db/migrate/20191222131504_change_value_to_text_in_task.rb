class ChangeValueToTextInTask < ActiveRecord::Migration[6.0]
  def change
    change_column :tasks, :value, :text
  end
end
