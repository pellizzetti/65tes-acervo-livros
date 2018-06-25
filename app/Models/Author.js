'use strict'

const Model = use('Model')

const moment = use('moment')

class Author extends Model {
  static get dates () {
    return super.dates.concat(['birthday'])
  }

  static formatDates (field, value) {
    if (field === 'birthday') {
      return moment(value, 'YYYY/MM/DD').format('YYYY-MM-DD')
    }

    return super.formatDates(field, value)
  }

  static castDates (field, value) {
    if (field === 'birthday') {
      return value.format('YYYY/MM/DD')
    }

    return super.formatDates(field, value)
  }

  static get computed () {
    return ['fullname', 'yearsold']
  }

  getFullname ({ firstname, lastname }) {
    return `${firstname} ${lastname}`
  }

  getYearsold ({ birthday }) {
    return `${moment(birthday, 'YYYY/MM/DD').fromNow(true).replace(/ .*/,'')} anos`
  }
}

module.exports = Author
