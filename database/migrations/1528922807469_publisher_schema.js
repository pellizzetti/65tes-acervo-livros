'use strict'

const Schema = use('Schema')

class PublisherSchema extends Schema {
  up () {
    this.create('publishers', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('publishers')
  }
}

module.exports = PublisherSchema
