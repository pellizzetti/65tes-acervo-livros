'use strict'

const Author = use('App/Models/Author')
const { test, trait } = use('Test/Suite')('Unitário -> Autor.editar')

trait('Test/Browser')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir autor cadastrado', async ({ assert, client }) => {
  const id = 1
  const response = await client.get(`/authors/edit/${id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'Esse autor não existe! :(')
})

test('Validação (Nome) | Deve retornar erro caso não seja informado nome', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzeti',
    birthday: '1994/05/16'
  })

  const firstname = ''

  const page = await browser.visit(`/authors/edit/${author.id}`)

  await page
    .clear('[name="firstname"]')
    .type('[name="firstname"]', firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/authors/edit/${author.id}`)

  await page.assertValue('[name="firstname"]', author.firstname)

  await page.assertExists('span.err')
})

test('Validação (Nome) | Deve retornar erro caso o nome tenha menos que 3 caracteres', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzeti',
    birthday: '1994/05/16'
  })

  const firstname = 'Gu'

  const page = await browser.visit(`/authors/edit/${author.id}`)

  await page
    .clear('[name="firstname"]')
    .type('[name="firstname"]', firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/authors/edit/${author.id}`)

  await page.assertValue('[name="firstname"]', author.firstname)

  await page.assertExists('span.err')
})

test('Validação (Nome) | Deve retornar erro caso o nome tenha mais que 25 caracteres', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzeti',
    birthday: '1994/05/16'
  })

  const firstname = 'UmNomeExtremamenteGigantesco'

  const page = await browser.visit(`/authors/edit/${author.id}`)

  await page
    .clear('[name="firstname"]')
    .type('[name="firstname"]', firstname)
    .type('[name="lastname"]', author.lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/authors/edit/${author.id}`)

  await page.assertValue('[name="firstname"]', author.firstname)

  await page.assertExists('span.err')
})

test('Validação (Sobrenome) | Deve retornar erro caso não seja informado sobrenome', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzeti',
    birthday: '1994/05/16'
  })

  const lastname = ''

  const page = await browser.visit(`/authors/edit/${author.id}`)

  await page
    .type('[name="firstname"]', author.firstname)
    .clear('[name="lastname"]')
    .type('[name="lastname"]', lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/authors/edit/${author.id}`)

  await page.assertValue('[name="lastname"]', author.lastname)

  await page.assertExists('span.err')
})

test('Validação (Sobrenome) | Deve retornar erro caso o sobrenome tenha menos que 3 caracteres', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzeti',
    birthday: '1994/05/16'
  })

  const lastname = 'Pe'

  const page = await browser.visit(`/authors/edit/${author.id}`)

  await page
    .type('[name="firstname"]', author.firstname)
    .clear('[name="lastname"]')
    .type('[name="lastname"]', lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/authors/edit/${author.id}`)

  await page.assertValue('[name="lastname"]', author.lastname)

  await page.assertExists('span.err')
})

test('Validação (Sobrenome) | Deve retornar erro caso o sobrenome tenha mais que 25 caracteres', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzeti',
    birthday: '1994/05/16'
  })

  const lastname = 'UmSobrenomeExtremamenteGigantesco'

  const page = await browser.visit(`/authors/edit/${author.id}`)

  await page
    .type('[name="firstname"]', author.firstname)
    .clear('[name="lastname"]')
    .type('[name="lastname"]', lastname)
    .type('[name="birthday"]', author.birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/authors/edit/${author.id}`)

  await page.assertValue('[name="lastname"]', author.lastname)

  await page.assertExists('span.err')
})

test('Validação (Data de Nascimento) | Deve retornar erro caso não seja informado data de nascimento', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzeti',
    birthday: '1994/05/16'
  })

  const birthday = '____/__/__'

  const page = await browser.visit(`/authors/edit/${author.id}`)

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .clear('[name="birthday"]')
    .type('[name="birthday"]', birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/authors/edit/${author.id}`)

  await page.assertExists('span.err')
})

test('Validação (Data de Nascimento) | Deve retornar erro caso a data de nascimento não esteja no formato requerido', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzeti',
    birthday: '1994/05/16'
  })

  const birthday = '1605/1_/__'

  const page = await browser.visit(`/authors/edit/${author.id}`)

  await page
    .type('[name="firstname"]', author.firstname)
    .type('[name="lastname"]', author.lastname)
    .clear('[name="birthday"]')
    .type('[name="birthday"]', birthday)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/authors/edit/${author.id}`)

  await page.assertExists('span.err')
})

test('Deve editar os dados de autor', async ({ browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzeti',
    birthday: '1994/05/16'
  })

  author.lastname = 'Pellizzetti'

  const page = await browser.visit(`/authors/edit/${author.id}`)

  await page
    .clear('[name="lastname"]')
    .type('[name="lastname"]', author.lastname)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/authors')

  await page.assertHas('Guilherme Pellizzetti')
})
