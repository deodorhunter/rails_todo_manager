class CreateTimeEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :time_entries, id: :uuid do |t|
      t.references :task, null: false, foreign_key: true, type: :uuid, index: true
      t.references :user, null: false, foreign_key: true, type: :uuid, index: true
      t.bigint :time

      t.timestamps
    end
  end
end
