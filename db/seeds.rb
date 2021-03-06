# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# db/seeds.rb
john = User.create!(
  email: "john.doe@example.com",
  username: "John",
  password: "123456"
)

jane = User.create!(
  email: "jane.doe@example.com",
  username: "Jane",
  password: "123456"
)

# Task.create!(
#   [
#     {
#       value: "Capire RoR !10giorni",  
#       owner: john,
#       overdue: 10.days.from_now,
#       assignees: jane,
#       completed: false,
#       category: nil,
#     },
#     {
#       value: "Sistemare alexa @John #nerd !today",  
#       owner: john,
#       overdue: Date.today,
#       assignee: john,
#       completed: false,
#       category: '#nerd',
#     },
#     {
#       value: "LAN party al Rune !2giorni #nerd",  
#       owner: jane,
#       overdue: 2.days.from_now,
#       assignee: nil,
#       completed: false,
#       category: '#nerd',
#     },
# ])