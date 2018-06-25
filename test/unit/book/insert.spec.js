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

  book.title = undefined
  book.author_id = author.id
  book.publisher_id = publisher.id

  const page = await browser.visit('/books/add')

  await page
    .type('[name="title"]', book.title)
    .select('[name="author_id"]', author.id)
    .select('[name="publisher_id"]', publisher.id)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/books/add')

  await page.assertExists('span.err')
})

test('Validação (Título) | Deve retornar erro caso o título tenha menos que 1 caractere', async ({ browser }) => {
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
    .select('[name="author_id"]', author.id)
    .select('[name="publisher_id"]', publisher.id)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/books/add')

  await page.assertExists('span.err')
})

// test('Validação (Título) | Deve retornar erro caso o nome título mais que 45 caracteres', async ({ browser }) => {
//   const book = new Book()

//   book.title = 'UmNomeExtremamenteGigantesco'
//   book.lastname = 'Pellizzetti'
//   book.birthday = '1994/05/16'

//   const page = await browser.visit('/books/add')

//   await page
//     .type('[name="title"]', book.title)
//     .type('[name="lastname"]', book.lastname)
//     .type('[name="birthday"]', book.birthday)
//     .submitForm('form')
//     .waitForNavigation()

//   await page.assertPath('/books/add')

//   await page.assertValue('[name="title"]', book.title)
//   await page.assertValue('[name="lastname"]', book.lastname)
//   await page.assertValue('[name="birthday"]', book.birthday)

//   await page.assertExists('span.err')
// })

// test('Validação (Autor) | Deve retornar erro caso não seja informado sobrenome', async ({ browser }) => {
//   const book = new Book()

//   book.title = 'Guilherme'
//   book.lastname = ''
//   book.birthday = '1994/05/16'

//   const page = await browser.visit('/books/add')

//   await page
//     .type('[name="title"]', book.title)
//     .type('[name="lastname"]', book.lastname)
//     .type('[name="birthday"]', book.birthday)
//     .submitForm('form')
//     .waitForNavigation()

//   await page.assertPath('/books/add')

//   await page.assertValue('[name="title"]', book.title)
//   await page.assertValue('[name="lastname"]', book.lastname)
//   await page.assertValue('[name="birthday"]', book.birthday)

//   await page.assertExists('span.err')
// })

// test('Validação (Data de Nascimento) | Deve retornar erro caso não seja informado data de nascimento', async ({ browser }) => {
//   const book = new Book()

//   book.title = 'Guilherme'
//   book.lastname = 'Pellizzetti'
//   book.birthday = '____/__/__'

//   const page = await browser.visit('/books/add')

//   await page
//     .type('[name="title"]', book.title)
//     .type('[name="lastname"]', book.lastname)
//     .type('[name="birthday"]', book.birthday)
//     .submitForm('form')
//     .waitForNavigation()

//   await page.assertPath('/books/add')

//   await page.assertValue('[name="title"]', book.title)
//   await page.assertValue('[name="lastname"]', book.lastname)
//   await page.assertValue('[name="birthday"]', book.birthday)

//   await page.assertExists('span.err')
// })

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

  await page.waitForElement('#author_id').waitForElement('[name="publisher_id"]')

  await page
    .type('[name="title"]', book.title)
    .clear('[name="author_id"]')
    // .select('[name="author_id"]', `${author.firstname} ${author.lastname}`)
    .select('#author_id', author.id)
    .clear('[name="publisher_id"]')
    .select('[name="publisher_id"]', publisher.name)
    // .select('[name="author_id"]', author.id)
    // .select('[name="publisher_id"]', publisher.id)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/books/add')
})
