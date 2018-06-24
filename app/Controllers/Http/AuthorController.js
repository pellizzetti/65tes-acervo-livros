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

    const authorData = request.only(['firstname', 'lastname', 'birthday'])

    const validation = await validateAll(authorData, rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    await Author.create(authorData)

    session.flash({
      notification: 'Autor adicionado com sucesso!'
    })

    return response.redirect('/authors')
  }
}

module.exports = AuthorController
