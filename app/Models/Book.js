'use strict'

const Model = use('Model')

class Book extends Model {
  author () {
    return this.belongsTo('App/Models/Author')
  }
}

module.exports = Book
