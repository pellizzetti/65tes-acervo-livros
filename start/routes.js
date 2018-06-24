'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('home')

Route.get('/authors', 'AuthorController.index')
Route.get('/authors/add', 'AuthorController.create')
Route.get('/authors/edit/:id', 'AuthorController.edit')
Route.get('/authors/:id', 'AuthorController.show')

Route.post('/authors', 'AuthorController.store')

Route.put('/authors/edit/:id', 'AuthorController.update')

Route.delete('/authors/:id', 'AuthorController.destroy')
