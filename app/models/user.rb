class User < ApplicationRecord
    has_many :tasks, :class_name => 'Task', :foreign_key => 'owner_id', dependent: :destroy
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
