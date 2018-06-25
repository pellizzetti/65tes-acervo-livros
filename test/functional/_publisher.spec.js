'use strict'

const Publisher = use('App/Models/Publisher')
const { test, trait } = use('Test/Suite')('Integração -> Editora')

trait('Test/Browser')
trait('DatabaseTransactions')

test('Deve acessar lista de editoras', async ({ browser }) => {
  const page = await browser.visit('/publishers')

  await page.assertPath('/publishers')
  await page.assertHas('Editoras')
})

test('Deve acessar cadastro de editoras', async ({ browser }) => {
  const page = await browser.visit('/publishers/add')

  await page.assertPath('/publishers/add')
  await page.assertHas('Adicionar editora')
})

test('Deve acessar edição de editoras', async ({ browser }) => {
  const publisher = await Publisher.create({
    name: 'John Books'
  })

  const page = await browser.visit(`/publishers/edit/${publisher.id}`)

  await page.assertPath(`/publishers/edit/${publisher.id}`)
  await page.assertHas('Editar editora')
})
