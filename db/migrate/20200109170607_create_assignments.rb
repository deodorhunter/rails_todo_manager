class CreateAssignments < ActiveRecord::Migration[6.0]
  def change
    create_table :assignments, id: :uuid, default: 'gen_random_uuid()' do |t|
      t.references :task, type: :uuid, index: true
      t.references :user, type: :uuid, index: true
    end
  end
end
