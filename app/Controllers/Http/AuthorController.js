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
    try {
      const author = await Author.findOrFail(params.id)

      return view.render('authors.detail', {
        author: author.toJSON()
      })
    } catch (err) {
      return view.render('error.index', {
        message: 'Esse autor não existe! :(',
        back: 'authors',
        err
      })
    }
  }

  async create({ view }) {
    return view.render('authors.form', {
      editing: false
    })
  }

  async edit({ params, view }) {
    const author = await Author.find(params.id)

    return view.render('authors.form', {
      editing: true,
      author: author.toJSON()
    })
  }

  async store({ request, response, session }) {
    const rules = {
      firstname: 'required|min:3|max:25',
      lastname: 'required|min:3|max:25',
      birthday: 'required|dateFormat:YYYY/MM/DD'
    }

    const messages = {
      'firstname.required': 'O nome é obrigatório',
      'lastname.required': 'O sobrenome é obrigatório',
      'birthday.required': 'A data de nascimento é obrigatória',
      'firstname.min': 'O nome é deve ter no mínimo 3 caracteres',
      'lastname.min': 'O sobrenome é deve ter no mínimo 3 caracteres',
      'firstname.max': 'O nome é deve ter no máximo 25 caracteres',
      'lastname.max': 'O sobrenome é deve ter no máximo 25 caracteres',
      'birthday.dateFormat': 'Data de nascimento fora do formato esperado. Ex.: 1974/02/21'
    }

    const authorData = request.only(['id', 'firstname', 'lastname', 'birthday'])

    const validation = await validateAll(authorData, rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    let author = null
    if (authorData.id !== 'null') {
      author = await Author.find(authorData.id)
    } else {
      author = new Author()
    }

    author.firstname = authorData.firstname
    author.lastname = authorData.lastname
    author.birthday = authorData.birthday

    await author.save()

    return response.redirect('/authors')
  }

  async destroy({params, session, response}) {
    const author = await Author.find(params.id)
    await author.delete()

    return response.redirect('/authors')
  }
}

module.exports = AuthorController
