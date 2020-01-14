class Task < ApplicationRecord
  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id'
  
  has_many :assignments, inverse_of: :user
  has_many :assignees, :through => :assignments, :foreign_key => 'user_id', :source => :user, dependent: :destroy
  #  class_name: 'User', join_table: 'tasks_users', :association_foreign_key => 'assignee_id', :foreign_key => 'task_id'
  validates :value, presence: true

  
end
