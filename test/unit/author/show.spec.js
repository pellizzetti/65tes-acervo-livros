'use strict'

const Author = use('App/Models/Author')
const { test, trait } = use('Test/Suite')('Autor -> detalhar')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir autor cadastrado', async ({ assert, client }) => {
  const id = 1
  const response = await client.get(`/authors/${id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'Esse autor não existe! :(')
})

test('Deve informar os detalhes do autor cadastrado', async ({ assert, client }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })

  const response = await client.get(`/authors/${author.id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'Guilherme Pellizzetti')
  assert.include(response.text, '1994/05/16 (24 anos)')
})
