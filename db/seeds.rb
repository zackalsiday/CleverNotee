# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

zakarya = User.create!({username: 'zakarya', password: 'password'})
mike = User.create!({username: 'mike', password: 'password'})
demo = User.create!({username: 'Guest', password: 'password'})
notebook1 = Notebook.create!({name: 'first notebook', user_id: zakarya.id})
notebook2 = Notebook.create!({name: 'first notebook', user_id: mike.id})
notebook3 = Notebook.create!({name: 'first notebook', user_id: demo.id})
note1 = Note.create!({title: 'First Note', content: '', author_id: zakarya.id, notebook_id: notebook1.id })
note2 = Note.create!({title: 'Second Note', content: '', author_id: zakarya.id, notebook_id: notebook1.id})
note3 = Note.create!({title: 'First Note', content: '', author_id: mike.id, notebook_id: notebook2.id})
note4 = Note.create!({title: 'Second Note', content: '', author_id: mike.id, notebook_id: notebook2.id})
note5 = Note.create!({title: 'first Note', content: '', author_id: demo.id, notebook_id: notebook3.id})
note6 = Note.create!({title: 'Second Note', content: '', author_id: demo.id, notebook_id: notebook3.id})
note7 = Note.create!({title: 'third Note', content: '', author_id: demo.id, notebook_id: notebook3.id})
note8 = Note.create!({title: 'fourth Note', content: '', author_id: demo.id, notebook_id: notebook3.id})
note9 = Note.create!({title: 'fifth Note', content: '', author_id: demo.id, notebook_id: notebook3.id})




