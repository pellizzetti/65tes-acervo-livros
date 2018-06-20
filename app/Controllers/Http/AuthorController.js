'use strict'

const Author = use('App/Models/Author')

const { validateAll } = use('Validator')

class AuthorController {

  async index({ view }) {
    const authors = await Author.all()

    return view.render('authors.index', {
      authors: authors.toJSON()
    })
  }

  async show({ params, view }) {
    const author = await Author.find(params.id)

    return view.render('authors.detail', {
      author: author.toJSON()
    })
  }

  async create({ view }) {
    return view.render('authors.form', {
      editing: false
    })
  }

  async edit({ params, view }) {
    const author = await Author.find(params.id)

    return view.render('authors.form', {
      editing: true, author
    })
  }

  async store({ request, response, session }) {
    const rules = {
      firstname: 'required|min:3|max:25',
      lastname: 'required|min:3|max:25',
      birthday: ['required', 'regex:/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2,2}/']
    }
    const messages = {
      'firstname.required': 'Please choose a unique username for your account',
      'email.required': 'Enter a valid email address.'
    }
    const validation = await validateAll(request.all(), rules)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    const author = new Author()

    author.firstname = request.input('firstname')
    author.lastname = request.input('lastname')
    author.birthday = request.input('birthday')

    console.log('aaa', author.birthday)

    await author.save()

    session.flash({
      notification: 'Autor adicionado com sucesso!'
    })

    return response.redirect('/authors')
  }
}

module.exports = AuthorController
