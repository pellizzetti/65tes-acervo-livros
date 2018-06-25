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
    try {
      const publisher = await Publisher.findOrFail(params.id)

      return view.render('publishers.detail', {
        publisher: publisher.toJSON()
      })
    } catch (err) {
      return view.render('error.index', {
        message: 'Essa editora não existe! :(',
        back: 'publishers',
        err
      })
    }
  }

  async create({ view }) {
    return view.render('publishers.form', {
      editing: false
    })
  }

  async edit({ params, view }) {
    try {
      const publisher = await Publisher.findOrFail(params.id)

      return view.render('publishers.form', {
        editing: true,
        publisher: publisher.toJSON()
      })
    } catch (err) {
      return view.render('error.index', {
        message: 'Essa editora não existe! :(',
        back: 'publishers',
        err
      })
    }
  }

  async store({ request, response, session }) {
    const rules = { name: 'required|min:3|max:25' }

    const messages = {
      'name.required': 'O nome é obrigatório',
      'name.min': 'O nome deve ter no mínimo 3 caracteres',
      'name.max': 'O nome deve ter no máximo 25 caracteres',
    }

    const publisherData = request.only(['id', 'name'])

    const validation = await validateAll(publisherData, rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashAll()

      return response.redirect('back')
    }

    let publisher = null
    if (publisherData.id !== 'null') {
      publisher = await Publisher.find(publisherData.id)
    } else {
      publisher = new Publisher()
    }

    publisher.name = publisherData.name

    await publisher.save()

    return response.redirect('/publishers')
  }

  async destroy({ response, params, view }) {
    try {
      const publisher = await Publisher.findOrFail(params.id)

      await publisher.delete()

      return response.redirect('/publishers')
    } catch (err) {
      return view.render('error.index', {
        message: 'Essa editora não existe! :(',
        back: 'publishers',
        err
      })
    }
  }
}

module.exports = PublisherController
