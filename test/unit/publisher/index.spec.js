'use strict'

const Publisher = use('App/Models/Publisher')
const { test, trait } = use('Test/Suite')('Unitário -> Editora.listar')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir editora cadastrada', async ({ assert, client }) => {
  const response = await client.get('/publishers').end()

  response.assertStatus(200)
  assert.include(response.text, 'Nenhuma editora cadastrada...')
})

test('Deve informar dados de editoras cadastradas', async ({ assert, client }) => {
  await Promise.all([
    Publisher.create({ name: 'John Books' }),
    Publisher.create({ name: 'O Malley Ink' })
  ])

  const response = await client.get('/publishers').end()

  response.assertStatus(200)
  assert.include(response.text, 'John Books')
  assert.include(response.text, 'O Malley Ink')
})
