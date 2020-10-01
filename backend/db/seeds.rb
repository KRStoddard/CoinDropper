# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Game.destroy_all
User.destroy_all


kimberlyn = User.create(username: 'Kimberlyn')
brian = User.create(username: 'Brian')
ramazan = User.create(username: 'Ramazan')

game1 = Game.create(points: 25, user: ramazan )
game2 = Game.create(points: 45, user: kimberlyn)
game3 = Game.create(points: 60, user: brian)