'use strict'

const { test, trait } = use('Test/Suite')('Sistema -> Navegação')

trait('Test/Browser')

test('Deve mostrar a opção de autores', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHasIn('ul.navigation-list li:first-child a', 'Autores')
})

test('Deve mostrar a opção de editoras', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHasIn('ul.navigation-list li:nth-child(2) a', 'Editoras')
})

test('Deve mostrar a opção de livros', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHasIn('ul.navigation-list li:last-child a', 'Livros')
})
