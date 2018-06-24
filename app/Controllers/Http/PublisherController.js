'use strict'

const Publisher = use('App/Models/Publisher')

const { validateAll } = use('Validator')

class PublisherController {
  async index({ view }) {
    const publishers = await Publisher.all()

    return view.render('publishers.index', {
      publishers: publishers.toJSON()
    })
  }

  async show({ params, view }) {
    const publisher = await Publisher.find(params.id)

    return view.render('publishers.detail', {
      publisher: publisher.toJSON()
    })
  }

  async create({ view }) {
    return view.render('publishers.form', {
      editing: false
    })
  }

  async edit({ params, view }) {
    const publisher = await Publisher.find(params.id)

    return view.render('publishers.form', {
      editing: true,
      publisher: publisher.toJSON()
    })
  }

  async store({ request, response, session }) {
    const rules = { name: 'required|min:3|max:25' }

    const messages = {
      'name.required': 'O nome é obrigatório',
      'name.min': 'O nome é deve ter no mínimo 3 caracteres',
      'name.max': 'O nome é deve ter no máximo 25 caracteres',
    }

    const publisherData = request.only(['name',])

    const validation = await validateAll(publisherData, rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    await Publisher.create(publisherData)

    session.flash({
      notification: 'Editora adicionado com sucesso!'
    })

    return response.redirect('/publishers')
  }
}

module.exports = PublisherController
