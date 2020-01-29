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
                                 password_confirmation: 'password',
                                 confirmed_at: Time.zone.now
                                 )

forms = [
  {
    name: 'My first form',
    payload: FormEditor::DefaultPayload::CONTACT_FORM
  },
  {
    name: 'My second form',
    payload: FormEditor::DefaultPayload::CONTACT_FORM
  },
  {
    name: 'My third form',
    payload: FormEditor::DefaultPayload::CONTACT_FORM
  },
]

forms.each do |form_hash|
  user.forms.create(form_hash)
end
