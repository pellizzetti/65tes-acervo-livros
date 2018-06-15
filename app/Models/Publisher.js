'use strict'

const Model = use('Model')

class Publisher extends Model {
  books () {
    return this.hasMany('App/Models/Book')
  }
}

module.exports = Publisher
