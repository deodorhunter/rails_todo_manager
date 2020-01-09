class Task < ApplicationRecord
  belongs_to :owner, :class_name => 'User'
  has_many :assignees, :through :assignations :class_name => 'User', optional: true
  validates :value, presence: true

end
