'use strict'

const Model = use('Model')

class Book extends Model {
  author () {
    return this.belongsTo('App/Models/Author')
  }

  publisher () {
    return this.belongsTo('App/Models/Publisher')
  }
}

module.exports = Book
