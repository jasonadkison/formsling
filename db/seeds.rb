# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.first || User.create(first_name: "John",
                                 last_name: "Doe",
                                 email: 'test@test.com',
                                 password: 'password',
                                 password_confirmation: 'password')

forms = [
  {
    name: 'My first form',
    url: 'http://example.com/1',
  },
  {
    name: 'My second form',
    url: 'http://example.com/2',
  },
  {
    name: 'My third form',
    url: 'http://example.com/3',
  },
]

forms.each do |form_hash|
  user.forms.create(form_hash)
end
