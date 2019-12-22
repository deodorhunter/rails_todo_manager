class SetNotNullableAndUniqueForUser < ActiveRecord::Migration[6.0]
  def change
    # https://stackoverflow.com/questions/23187037/rails-whats-difference-in-unique-index-and-validates-uniqueness-of
    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
    change_column_null :users, :username, false
    change_column_null :users, :email, false
    change_column_null :users, :password, false
  end
end
