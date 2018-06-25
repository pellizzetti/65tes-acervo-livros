'use strict'

const Publisher = use('App/Models/Publisher')
const { test, trait } = use('Test/Suite')('Unitário -> Editora.deletar')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir editora cadastrada', async ({ assert, client }) => {
  const id = 1
  const response = await client.delete(`/publishers/delete/${id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'Essa editora não existe! :(')
})

test('Deve remover dados de editoras cadastradas', async ({ assert, client }) => {
  await Publisher.create({ name: 'John Books' })

  const publisher = await Publisher.create({ name: 'O Malley Ink'})

  const response = await client.delete(`/publishers/delete/${publisher.id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'John Books')
  assert.notInclude(response.text, 'O Malley Ink')
})
