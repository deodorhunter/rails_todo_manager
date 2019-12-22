class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    enable_extension "btree_gin"
    create_table :tasks do |t|
      t.references :user, null: false, foreign_key: true
      t.string :value
      t.boolean :completed
      t.string :category
      t.date :overdue
      t.string :assignee, array: true, default: []

      t.timestamps
    end
    add_index :tasks, :assignee, using: 'gin'
    add_index :tasks, :category, using: 'gin'
  end
end
