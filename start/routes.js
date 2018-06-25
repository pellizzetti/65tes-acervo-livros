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

Route.put('/authors/edit/:id', 'AuthorController.store')

Route.delete('/authors/:id', 'AuthorController.destroy')

Route.get('/books', 'BookController.index')
Route.get('/books/add', 'BookController.create')
Route.get('/books/edit/:id', 'BookController.edit')
Route.get('/books/:id', 'BookController.show')

Route.post('/books', 'BookController.store')

Route.put('/books/edit/:id', 'BookController.update')

Route.delete('/books/:id', 'BookController.destroy')

Route.get('/publishers', 'PublisherController.index')
Route.get('/publishers/add', 'PublisherController.create')
Route.get('/publishers/edit/:id', 'PublisherController.edit')
Route.get('/publishers/:id', 'PublisherController.show')

Route.post('/publishers', 'PublisherController.store')

Route.put('/publishers/edit/:id', 'PublisherController.update')

Route.delete('/publishers/:id', 'PublisherController.destroy')
