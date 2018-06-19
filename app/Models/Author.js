'use strict'

const Model = use('Model')

class Author extends Model {
  static get computed () {
    return ['fullname']
  }

  getFullname ({ firstname, lastname }) {
    return `${firstname} ${lastname}`
  }

  books () {
    return this.hasMany('App/Models/Book')
  }
}

module.exports = Author
