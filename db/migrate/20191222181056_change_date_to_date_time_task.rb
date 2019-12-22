class ChangeDateToDateTimeTask < ActiveRecord::Migration[6.0]
  def change
    change_column :tasks, :overdue, :datetime
  end
end
