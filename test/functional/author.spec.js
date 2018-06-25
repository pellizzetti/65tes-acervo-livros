'use strict'

const Author = use('App/Models/Author')
const { test, trait } = use('Test/Suite')('Integração -> Autor')

trait('Test/Browser')
trait('Test/ApiClient')
trait('DatabaseTransactions')

test('Deve acessar lista de autores', async ({ assert, browser }) => {
  const page = await browser.visit('/authors')

  await page.assertPath('/authors')
  await page.assertHas('Autores')
})

test('Deve acessar cadastro de autores', async ({ assert, browser }) => {
  const page = await browser.visit('/authors/add')

  await page.assertPath('/authors/add')
  await page.assertHas('Adicionar autor')
})

test('Deve acessar edição de autores', async ({ assert, browser }) => {
  const author = await Author.create({
    firstname: 'Guilherme',
    lastname: 'Pellizzetti',
    birthday: '1994/05/16'
  })

  const page = await browser.visit(`/authors/edit/${author.id}`)

  await page.assertPath(`/authors/edit/${author.id}`)
  await page.assertHas('Editar autor')
})
