'use strict'

const Author = use('App/Models/Author')
const { test, trait } = use('Test/Suite')('Autor')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Lista autores', async ({ assert, client }) => {
  await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })

  const response = await client.get('/authors').end()

  response.assertStatus(200)
  assert.include(response.text, 'Guilherme Pellizzetti')
})
