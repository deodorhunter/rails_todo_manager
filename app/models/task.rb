class Task < ApplicationRecord
  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id'
  
  has_many :assignments
  has_many :time_entries
 
  has_many :assignees, :through => :assignments , dependent: :destroy, :source => :user
  # , :foreign_key => 'user_id', :source => :user
  #  class_name: 'User', join_table: 'tasks_users', :association_foreign_key => 'assignee_id', :foreign_key => 'task_id'
  has_many :user_time_entries, :through => :time_entries, source: :user, dependent: :destroy 
  validates :value, presence: true

  
end
