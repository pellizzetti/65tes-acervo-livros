'use strict'

const Book = use('App/Models/Book')
const Author = use('App/Models/Author')
const Publisher = use('App/Models/Publisher')
const { test, trait } = use('Test/Suite')('Unitário -> Livro.deletar')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir livro cadastrado', async ({ assert, client }) => {
  const id = 1
  const response = await client.delete(`/books/delete/${id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'Esse livro não existe! :(')
})

test('Deve remover dados de livros cadastrados', async ({ assert, client }) => {
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

  const book = await Book.create({
    title: 'An Example of a Google Bar Chart',
    author_id: author.id,
    publisher_id: publisher.id
  })

  const response = await client.delete(`/books/delete/${book.id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'CSS Tableless Table')
  assert.notInclude(response.text, 'An Example of a Google Bar Chart')
})
