class User < ApplicationRecord

    has_secure_password

    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

    before_save { self.email = email.downcase }

    has_many :assignments, inverse_of: :task
    has_many :assigned_tasks, :through => :assignments, :foreign_key => 'task_id', :source => :task, dependent: :destroy
    # , :class_name => 'Task', :foreign_key => 'assignee_id'
   
    has_many :tasks, :class_name => 'Task', :foreign_key => 'owner_id', dependent: :destroy

    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true, length: { maximum: 50 }
    validates :password, presence: true, length: { minimum: 6 }
    validates :email, presence: true, length: { maximum: 255 },
                        format: { with: VALID_EMAIL_REGEX },
                        uniqueness: { case_sensitive: false }
end
