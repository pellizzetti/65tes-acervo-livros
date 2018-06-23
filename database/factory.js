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
const moment = use('moment')

const DATE_FORMAT = 'YYYY-MM-DD'

Factory.blueprint('App/Models/Author', (faker, index, data) => {
  const start = new Date(1450, 0, 1)
  const end = new Date(2012, 11, 31)

  const defaultValue = {
    firstname: faker.first(),
    lastname: faker.last(),
    birthday: moment(new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))).format(DATE_FORMAT)
  }

  return Object.assign(defaultValue, data)
})
