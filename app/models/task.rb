class Task < ApplicationRecord
  belongs_to :owner, :class_name => 'User'
  belongs_to :assignee, :class_name => 'User', optional: true
  validates :value, presence: true

end
