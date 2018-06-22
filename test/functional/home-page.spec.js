'use strict'

const { test } = use('Test/Suite')('Home Page')

test('Visit home page', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHas('Adonis')
})
