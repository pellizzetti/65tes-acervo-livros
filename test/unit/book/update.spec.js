'use strict'

const Book = use('App/Models/Book')
const Author = use('App/Models/Author')
const Publisher = use('App/Models/Publisher')
const { test, trait, skip } = use('Test/Suite')('Unitário -> Livro.editar')

trait('Test/Browser')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir livro cadastrado', async ({ assert, client }) => {
  const id = 1
  const response = await client.get(`/books/edit/${id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'Esse livro não existe! :(')
})

test('Validação (Título) | Deve retornar erro caso não seja informado título', async ({ browser }) => {
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

  const title = ''

  const page = await browser.visit(`/books/edit/${book.id}`)

  await page
    .clear('[name="title"]')
    .type('[name="title"]', title)
    .select('[name="author_id"]', `${author.id}`)
    .select('[name="publisher_id"]', `${publisher.id}`)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/books/edit/${book.id}`)

  await page.assertValue('[name="title"]', book.title)

  await page.assertExists('span.err')
})

test('Validação (Autor) | Deve retornar erro caso não seja informado autor', async ({ browser }) => {
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

  const author_id = ''

  const page = await browser.visit(`/books/edit/${book.id}`)

  await page
    .type('[name="title"]', book.title)
    .select('[name="author_id"]', author_id)
    .select('[name="publisher_id"]', `${publisher.id}`)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/books/edit/${book.id}`)

  await page.assertValue('[name="author_id"]', `${book.author_id}`)

  await page.assertExists('span.err')
})

test('Validação (Editora) | Deve retornar erro caso não seja informado editora', async ({ browser }) => {
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

  const publisher_id = ''

  const page = await browser.visit(`/books/edit/${book.id}`)

  await page
    .type('[name="title"]', book.title)
    .select('[name="author_id"]', `${author.id}`)
    .select('[name="publisher_id"]', publisher_id)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/books/edit/${book.id}`)

  await page.assertValue('[name="publisher_id"]', `${book.publisher_id}`)

  await page.assertExists('span.err')
})

test('Deve editar os dados de livro', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })

  const publisher = await Publisher.create({ name: 'John Books' })

  const book = await Book.create({
    title: 'CSS Tableless Tablr',
    author_id: author.id,
    publisher_id: publisher.id
  })

  book.title = 'CSS Tableless Tablr'

  const page = await browser.visit(`/books/edit/${book.id}`)

  await page
    .clear('[name="title"]')
    .type('[name="title"]', book.title)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/books')

  await page.assertHas('CSS Tableless Tablr')
})
