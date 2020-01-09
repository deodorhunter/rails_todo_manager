class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    enable_extension "btree_gin"
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
    create_table :tasks, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :owner, type: :uuid, null: false, foreign_key: true
      t.string :value
      t.boolean :completed
      t.string :category
      t.date :overdue
      t.references :assignee, type: :uuid, null: true, foreign_key: true

      t.timestamps
    end
    add_index :tasks, :completed
    add_index :tasks, [:category, :completed]
    add_index :tasks, :category, using: 'gin'
  end
end
