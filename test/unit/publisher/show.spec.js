'use strict'

const Publisher = use('App/Models/Publisher')
const { test, trait } = use('Test/Suite')('Unitário -> Editora.detalhar')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir editora cadastrada', async ({ assert, client }) => {
  const id = 1
  const response = await client.get(`/publishers/${id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'Essa editora não existe! :(')
})

test('Deve informar os detalhes da editora cadastrada', async ({ assert, client }) => {
  const publisher = await Publisher.create({ name: 'John Books' })

  const response = await client.get(`/publishers/${publisher.id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'John Books')
})
