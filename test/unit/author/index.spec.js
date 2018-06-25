'use strict'

const Author = use('App/Models/Author')
const { test, trait } = use('Test/Suite')('Autor -> listar')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir autor cadastrado', async ({ assert, client }) => {
  const response = await client.get('/authors').end()

  response.assertStatus(200)
  assert.include(response.text, 'Nenhum autor cadastrado...')
})

test('Deve informar dados de autores cadastrados', async ({ assert, client }) => {
  await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })

  await Author.create({
    firstname: 'Mateus',
    lastname: 'Gomes',
    birthday: '1994/02/12'
  })

  const response = await client.get('/authors').end()

  response.assertStatus(200)
  assert.include(response.text, 'Guilherme Pellizzetti')
  assert.include(response.text, 'Mateus Gomes')
})
