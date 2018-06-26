'use strict'

const Book = use('App/Models/Book')
const Author = use('App/Models/Author')
const Publisher = use('App/Models/Publisher')
const { test, trait } = use('Test/Suite')('Unitário -> Livro.inserir')

trait('Test/Browser')
trait('DatabaseTransactions')

test('Validação (Título) | Deve retornar erro caso não seja informado título', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })

  const publisher = await Publisher.create({ name: 'John Books' })

  const book = new Book()

  book.title = ''
  book.author_id = author.id
  book.publisher_id = publisher.id

  const page = await browser.visit('/books/add')

  await page
    .type('[name="title"]', book.title)
    .select('[name="author_id"]', `${author.id}`)
    .select('[name="publisher_id"]', `${publisher.id}`)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/books/add')

  await page.assertValue('[name="title"]', book.title)
  await page.assertValue('[name="author_id"]', `${author.id}`)
  await page.assertValue('[name="publisher_id"]', `${publisher.id}`)

  await page.assertExists('span.err')
})

test('Validação (Autor) | Deve retornar erro caso não seja informado autor', async ({ browser }) => {
  const publisher = await Publisher.create({ name: 'John Books' })

  const book = new Book()

  book.title = 'CSS Tableless Table'
  book.author_id = ''
  book.publisher_id = publisher.id

  const page = await browser.visit('/books/add')

  await page
    .type('[name="title"]', book.title)
    .select('[name="author_id"]', book.author_id)
    .select('[name="publisher_id"]', `${book.publisher_id}`)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/books/add')

  await page.assertValue('[name="title"]', book.title)
  await page.assertValue('[name="author_id"]', book.author_id)
  await page.assertValue('[name="publisher_id"]', `${publisher.id}`)

  await page.assertExists('span.err')
})

test('Validação (Editora) | Deve retornar erro caso não seja informado editora', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })


  const book = new Book()

  book.title = 'CSS Tableless Table'
  book.author_id = author.id
  book.publisher_id = ''

  const page = await browser.visit('/books/add')

  await page
    .type('[name="title"]', book.title)
    .select('[name="author_id"]', `${author.id}`)
    .select('[name="publisher_id"]', book.publisher_id)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/books/add')

  await page.assertValue('[name="title"]', book.title)
  await page.assertValue('[name="author_id"]', `${author.id}`)
  await page.assertValue('[name="publisher_id"]', book.publisher_id)

  await page.assertExists('span.err')
})

test('Deve inserir os dados do livro', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })

  const publisher = await Publisher.create({ name: 'John Books' })

  const book = new Book()

  book.title = 'CSS Tableless Table'
  book.author_id = author.id
  book.publisher_id = publisher.id

  const page = await browser.visit('/books/add')

  await page
    .type('[name="title"]', book.title)
    .select('[name="author_id"]', `${author.id}`)
    .select('[name="publisher_id"]', `${publisher.id}`)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/books')

  await page.assertHas(book.title)
})
