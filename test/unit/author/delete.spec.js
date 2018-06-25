'use strict'

const Author = use('App/Models/Author')
const { test, trait } = use('Test/Suite')('Autor -> deletar')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir autor cadastrado', async ({ assert, client }) => {
  const id = 1
  const response = await client.delete(`/authors/delete/${id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'Esse autor não existe! :(')
})

test('Deve remover dados de autores cadastrados', async ({ assert, client }) => {
  await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })

  const author = await Author.create({
    firstname: 'Mateus',
    lastname: 'Gomes',
    birthday: '1994/02/12'
  })

  const response = await client.delete(`/authors/delete/${author.id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'Guilherme Pellizzetti')
  assert.notInclude(response.text, 'Mateus Gomes')
})
