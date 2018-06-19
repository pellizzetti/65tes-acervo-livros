'use strict'

const Schema = use('Schema')

class BookSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments()
      table.string('isbn')
      table.string('title')
      table.date('publishing_date')
      table.integer('author_id').references('id').inTable('authors')
      table.timestamps()
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BookSchema
