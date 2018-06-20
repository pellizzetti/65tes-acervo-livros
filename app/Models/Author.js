'use strict'

const Model = use('Model')

class Author extends Model {
  static get dates () {
    return super.dates.concat(['birthday'])
  }

  static formatDates (field, value) {
    if (field === 'birthday') {
      // return value.format('YYYY-MM-DD')
    }

    return super.formatDates(field, value)
  }

  static castDates (field, value) {
    if (field === 'birthday') {
      // return `${value.format('DD/MM/YYYY')} (${value.fromNow(true).replace(/ .*/,'')} anos)`
      return value.format('DD/MM/YYYY')
    }

    return super.formatDates(field, value)
  }

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
