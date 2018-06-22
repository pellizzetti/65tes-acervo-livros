'use strict'

const { test, trait } = use('Test/Suite')('Home')

trait('Test/Browser')

test('Visit home page', async ({ browser }) => {
  const page = await browser.visit('/')
  await page.assertHas('Bookist')
})
