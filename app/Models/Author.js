'use strict'

const Model = use('Model')

class Author extends Model {
  books () {
    return this.hasMany('App/Models/Book')
  }
}

module.exports = Author
