'use strict'

const { test, trait, suit } = use('Test/Suite')('Sistema -> Página inicial')

trait('Test/Browser')

test('Deve mostrar o título', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHasIn('h1.title', 'Bookist!')
})

test('Deve mostrar o sub-título', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHasIn('p.subtitle', 'Uma maneira simples de manter seu histórico de livros.')
})

test('Deve mostrar a dica', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHasIn('p.tip', 'use as opções acima para começar ;)')
})
