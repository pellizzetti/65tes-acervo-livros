'use strict'

const Publisher = use('App/Models/Publisher')
const { test, trait } = use('Test/Suite')('Unitário -> Editora.inserir')

trait('Test/Browser')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Validação (Nome) | Deve retornar erro caso não seja informado nome', async ({ browser }) => {
  const publisher = new Publisher()

  publisher.name = ''

  const page = await browser.visit('/publishers/add')

  await page
    .type('[name="name"]', publisher.name)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/publishers/add')

  await page.assertValue('[name="name"]', publisher.name)

  await page.assertExists('span.err')
})

test('Validação (Nome) | Deve retornar erro caso o nome tenha menos que 3 caracteres', async ({ browser }) => {
  const publisher = new Publisher()

  publisher.name = 'Jo'

  const page = await browser.visit('/publishers/add')

  await page
    .type('[name="name"]', publisher.name)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/publishers/add')

  await page.assertValue('[name="name"]', publisher.name)

  await page.assertExists('span.err')
})

test('Validação (Nome) | Deve retornar erro caso o nome tenha mais que 25 caracteres', async ({ browser }) => {
  const publisher = new Publisher()

  publisher.name = 'UmNomeExtremamenteGigantesco'

  const page = await browser.visit('/publishers/add')

  await page
    .type('[name="name"]', publisher.name)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/publishers/add')

  await page.assertValue('[name="name"]', publisher.name)

  await page.assertExists('span.err')
})

test('Deve inserir os dados da editora', async ({ browser }) => {
  const publisher = new Publisher()

  publisher.name = 'John Books'

  const page = await browser.visit('/publishers/add')

  await page
    .type('[name="name"]', publisher.name)
    .submitForm('form')
    .waitForNavigation()

  await page.assertPath('/publishers')

  await page.assertHas(publisher.name)
})
