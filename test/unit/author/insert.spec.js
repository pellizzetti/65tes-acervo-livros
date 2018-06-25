'use strict'

const Author = use('App/Models/Author')
const { test, trait } = use('Test/Suite')('Autor -> inserir')

trait('Test/Browser')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Validação (Nome) | Deve retornar erro caso não seja informado nome', async ({ browser }) => {
  const author = new Author()

  author.firstname = ''
  author.lastname = 'Pellizzetti'
  author.birthday = '1994/05/16'

  const page = await browser.visit('/authors/add')

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/authors/add')

  await page.assertValue('[name="firstname"]', author.firstname)
  await page.assertValue('[name="lastname"]', author.lastname)
  await page.assertValue('[name="birthday"]', author.birthday)

  await page.assertExists('span.err')
})

test('Validação (Nome) | Deve retornar erro caso o nome tenha menos que 3 caracteres', async ({ browser }) => {
  const author = new Author()

  author.firstname = 'Gu'
  author.lastname = 'Pellizzetti'
  author.birthday = '1994/05/16'

  const page = await browser.visit('/authors/add')

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/authors/add')

  await page.assertValue('[name="firstname"]', author.firstname)
  await page.assertValue('[name="lastname"]', author.lastname)
  await page.assertValue('[name="birthday"]', author.birthday)

  await page.assertExists('span.err')
})

test('Validação (Nome) | Deve retornar erro caso o nome tenha mais que 25 caracteres', async ({ browser }) => {
  const author = new Author()

  author.firstname = 'UmNomeExtremamenteGigantesco'
  author.lastname = 'Pellizzetti'
  author.birthday = '1994/05/16'

  const page = await browser.visit('/authors/add')

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/authors/add')

  await page.assertValue('[name="firstname"]', author.firstname)
  await page.assertValue('[name="lastname"]', author.lastname)
  await page.assertValue('[name="birthday"]', author.birthday)

  await page.assertExists('span.err')
})

test('Validação (Sobrenome) | Deve retornar erro caso não seja informado sobrenome', async ({ browser }) => {
  const author = new Author()

  author.firstname = 'Guilherme'
  author.lastname = ''
  author.birthday = '1994/05/16'

  const page = await browser.visit('/authors/add')

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/authors/add')

  await page.assertValue('[name="firstname"]', author.firstname)
  await page.assertValue('[name="lastname"]', author.lastname)
  await page.assertValue('[name="birthday"]', author.birthday)

  await page.assertExists('span.err')
})

test('Validação (Sobrenome) | Deve retornar erro caso o sobrenome tenha menos que 3 caracteres', async ({ browser }) => {
  const author = new Author()

  author.firstname = 'Guilherme'
  author.lastname = 'Pe'
  author.birthday = '1994/05/16'

  const page = await browser.visit('/authors/add')

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/authors/add')

  await page.assertValue('[name="firstname"]', author.firstname)
  await page.assertValue('[name="lastname"]', author.lastname)
  await page.assertValue('[name="birthday"]', author.birthday)

  await page.assertExists('span.err')
})

test('Validação (Sobrenome) | Deve retornar erro caso o sobrenome tenha mais que 25 caracteres', async ({ browser }) => {
  const author = new Author()

  author.firstname = 'Guilherme'
  author.lastname = 'UmSobrenomeExtremamenteGigantesco'
  author.birthday = '1994/05/16'

  const page = await browser.visit('/authors/add')

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/authors/add')

  await page.assertValue('[name="firstname"]', author.firstname)
  await page.assertValue('[name="lastname"]', author.lastname)
  await page.assertValue('[name="birthday"]', author.birthday)

  await page.assertExists('span.err')
})

test('Validação (Data de Nascimento) | Deve retornar erro caso não seja informado data de nascimento', async ({ browser }) => {
  const author = new Author()

  author.firstname = 'Guilherme'
  author.lastname = 'Pellizzetti'
  author.birthday = '____/__/__'

  const page = await browser.visit('/authors/add')

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/authors/add')

  await page.assertValue('[name="firstname"]', author.firstname)
  await page.assertValue('[name="lastname"]', author.lastname)
  await page.assertValue('[name="birthday"]', author.birthday)

  await page.assertExists('span.err')
})

test('Validação (Data de Nascimento) | Deve retornar erro caso a data de nascimento não esteja no formato requerido', async ({ browser }) => {
  const author = new Author()

  author.firstname = 'Guilherme'
  author.lastname = 'Pellizzetti'
  author.birthday = '1605/1_/__'

  const page = await browser.visit('/authors/add')

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/authors/add')

  await page.assertValue('[name="firstname"]', author.firstname)
  await page.assertValue('[name="lastname"]', author.lastname)
  await page.assertValue('[name="birthday"]', author.birthday)

  await page.assertExists('span.err')
})

test('Deve inserir os dados de autor', async ({ browser }) => {
  const author = new Author()

  author.firstname = 'Guilherme'
  author.lastname = 'Pellizzetti'
  author.birthday = '1994/05/16'

  const page = await browser.visit('/authors/add')

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/authors')

  await page.assertHas(`${author.firstname} ${author.lastname}`)
})
