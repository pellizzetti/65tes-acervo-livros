'use strict'

const Book = use('App/Models/Book')
const Author = use('App/Models/Author')
const Publisher = use('App/Models/Publisher')
const { test, trait } = use('Test/Suite')('Integração -> Livro')

trait('Test/Browser')
trait('DatabaseTransactions')

test('Deve acessar lista de livros', async ({ browser }) => {
  const page = await browser.visit('/books')

  await page.assertPath('/books')
  await page.assertHas('Livros')
})

test('Deve acessar cadastro de livros', async ({ browser }) => {
  const page = await browser.visit('/books/add')

  await page.assertPath('/books/add')
  await page.assertHas('Adicionar livro')
})

test('Deve acessar edição de livros', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })

  const publisher = await Publisher.create({ name: 'John Books' })

  const book = await Book.create({
    title: 'CSS Tableless Table',
    author_id: author.id,
    publisher_id: publisher.id
  })

  const page = await browser.visit(`/books/edit/${book.id}`)

  await page.assertPath(`/books/edit/${book.id}`)
  await page.assertHas('Editar livro')
})
