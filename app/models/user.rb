class User < ApplicationRecord
    has_many :tasks, dependent: :destroy
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
