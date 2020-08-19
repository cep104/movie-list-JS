# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user_a = User.create(name:'Jessica', username:'cep104', email: 'cep104@gmail.com')
list_a = List.create(title:'Best Horror Movies', description: 'Best horror movies of the decade')
list_b = List.create(title:'Best Rom Coms', description: 'Best Rom Com movies of the decade')
Movie.create(title:'Army of Darkness', description:'the third Evil Dead film Staring Bruce Campbell and directed by Sam Rami', rating: 10, list: list_a)
Movie.create(title:'Evil Dead', description:'the first Evil Dead film Staring Bruce Campbell and directed by Sam Rami', rating: 9, list: list_a)
Movie.create(title:'When Harry Met Sally', description:'Two Friends Fall in love', rating: 7, list: list_b)
Movie.create(title:'Just Friends', description:'Man visits hometown falls back in love with highschool crush', rating: 8, list: list_b)