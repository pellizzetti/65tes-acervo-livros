'use strict'

const Book = use('App/Models/Book')
const Author = use('App/Models/Author')
const Publisher = use('App/Models/Publisher')
const { test, trait } = use('Test/Suite')('Unitário -> Livro.listar')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir livro cadastrado', async ({ assert, client }) => {
  const response = await client.get('/books').end()

  response.assertStatus(200)
  assert.include(response.text, 'Nenhum livro cadastrado...')
})

test('Deve informar dados de livros cadastrados', async ({ assert, client }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })

  const publisher = await Publisher.create({ name: 'John Books' })

  await Book.create({
    title: 'CSS Tableless Table',
    author_id: author.id,
    publisher_id: publisher.id
  })

  await Book.create({
    title: 'An Example of a Google Bar Chart',
    author_id: author.id,
    publisher_id: publisher.id
  })

  const response = await client.get('/books').end()

  response.assertStatus(200)
  assert.include(response.text, 'CSS Tableless Table')
  assert.include(response.text, 'An Example of a Google Bar Chart')
})
