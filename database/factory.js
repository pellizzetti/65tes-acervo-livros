'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

const Factory = use('Factory')

Factory.blueprint('App/Models/Author', (faker, index, data) => {
  const defaultValue = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    birthday: faker.date.between('1450-01-01', '2010-12-31')
  }

  return Object.assign(defaultValue, data)
})
