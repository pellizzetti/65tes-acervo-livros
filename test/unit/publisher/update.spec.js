'use strict'

const Publisher = use('App/Models/Publisher')
const { test, trait } = use('Test/Suite')('Unitário -> Autor.editar')

trait('Test/Browser')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve informar se não existir editora cadastrada', async ({ assert, client }) => {
  const id = 1
  const response = await client.get(`/publishers/edit/${id}`).end()

  response.assertStatus(200)
  assert.include(response.text, 'Essa editora não existe! :(')
})

test('Validação (Nome) | Deve retornar erro caso não seja informado nome', async ({ browser }) => {
  const publisher = await Publisher.create({ name: 'Guilherme' })

  const name = ''

  const page = await browser.visit(`/publishers/edit/${publisher.id}`)

  await page
    .clear('[name="name"]')
    .type('[name="name"]', name)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/publishers/edit/${publisher.id}`)

  await page.assertValue('[name="name"]', publisher.name)

  await page.assertExists('span.err')
})

test('Validação (Nome) | Deve retornar erro caso o nome tenha menos que 3 caracteres', async ({ browser }) => {
  const publisher = await Publisher.create({ name: 'Guilherme' })

  const name = 'Jo'

  const page = await browser.visit(`/publishers/edit/${publisher.id}`)

  await page
    .clear('[name="name"]')
    .type('[name="name"]', name)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/publishers/edit/${publisher.id}`)

  await page.assertValue('[name="name"]', publisher.name)

  await page.assertExists('span.err')
})

test('Validação (Nome) | Deve retornar erro caso o nome tenha mais que 25 caracteres', async ({ browser }) => {
  const publisher = await Publisher.create({ name: 'John Books' })

  const name = 'UmNomeExtremamenteGigantesco'

  const page = await browser.visit(`/publishers/edit/${publisher.id}`)

  await page
    .clear('[name="name"]')
    .type('[name="name"]', name)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath(`/publishers/edit/${publisher.id}`)

  await page.assertValue('[name="name"]', publisher.name)

  await page.assertExists('span.err')
})

test('Deve editar os dados da editora', async ({ browser }) => {
  const publisher = await Publisher.create({ name: 'John Boks' })

  publisher.name = 'John Books'

  const page = await browser.visit(`/publishers/edit/${publisher.id}`)

  await page
    .clear('[name="name"]')
    .type('[name="name"]', publisher.name)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/publishers')

  await page.assertHas('John Books')
})
