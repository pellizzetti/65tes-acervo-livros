'use strict'

const Author = use('App/Models/Author')

const { validate } = use('Validator')

class AuthorController {

  async index({ view }) {
    const authors = await Author.all()

    return view.render('authors.index', {
      authors: authors.toJSON()
    })
  }

  async create({ view }) {
    return view.render('authors.form', { editing: false })
  }

  async edit({ params, view }) {
    const author = await Author.find(params.id)
    
    return view.render('authors.form', { editing: true, author })
  }

  async store({ request, response, session }) {
    const rules = {
      firstname: 'required|min:3|max:25',
      lastname: 'required|min:3|max:25',
      birthday: 'required|min:3'
    }
    const validation = await validate(request.all(), rules)

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

    await author.save()

    session.flash({ notification: 'Autor adicionado com sucesso!' })

    return response.redirect('/authors')
  }
}

module.exports = AuthorController
