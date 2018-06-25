'use strict'

const Book = use('App/Models/Book')
const Author = use('App/Models/Author')
const Publisher = use('App/Models/Publisher')

const { validateAll } = use('Validator')

class BookController {
  async index({ view }) {
    const books = await Book.all()

    return view.render('books.index', {
      books: books.toJSON()
    })
  }

  async show({ params, view }) {
    try {
      const book = await Book.findOrFail(params.id)
      const author = await Author.find(book.author_id)
      const publisher = await Publisher.find(book.publisher_id)

      return view.render('books.detail', {
        book: book.toJSON(),
        author: author.toJSON(),
        publisher: publisher.toJSON()
      })
    } catch (err) {
      return view.render('error.index', {
        message: 'Esse livro não existe! :(',
        back: 'books',
        err
      })
    }
  }

  async create({ view }) {
    const authors = await Author.all()
    const publishers = await Publisher.all()

    return view.render('books.form', {
      authors: authors.toJSON(),
      publishers: publishers.toJSON(),
      editing: false
    })
  }

  async edit({ params, view }) {
    try {
      const book = await Book.findOrFail(params.id)
      const authors = await Author.all()
      const publishers = await Publisher.all()

      return view.render('books.form', {
        editing: true,
        book: book.toJSON(),
        authors: authors.toJSON(),
        publishers: publishers.toJSON(),
      })
    } catch (err) {
      return view.render('error.index', {
        message: 'Esse livro não existe! :(',
        back: 'books',
        err
      })
    }
  }

  async store({ request, response, session }) {
    const rules = {
      title: 'required|min:1|max:45',
      author_id: 'required',
      publisher_id: 'required'
    }

    const messages = {
      'title.required': 'O título é obrigatório',
      'author_id.required': 'O autor é obrigatório',
      'publisher_id.required': 'A editora é obrigatória',
      'title.min': 'O título deve ter no mínimo 1 caracteres',
      'title.max': 'O título deve ter no máximo 45 caracteres',
    }

    const bookData = request.only(['id', 'title', 'author_id', 'publisher_id'])

    const validation = await validateAll(bookData, rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    let book = null
    if (bookData.id !== 'null') {
      book = await Book.find(bookData.id)
    } else {
      book = new Book()
    }

    book.title = bookData.title
    book.author_id = bookData.author_id
    book.publisher_id = bookData.publisher_id

    await book.save()

    return response.redirect('/books')
  }

  async destroy({ response, params, view }) {
    try {
      const book = await Book.findOrFail(params.id)

      await book.delete()

      return response.redirect('/books')
    } catch (err) {
      return view.render('error.index', {
        message: 'Esse livro não existe! :(',
        back: 'books',
        err
      })
    }
  }
}

module.exports = BookController
