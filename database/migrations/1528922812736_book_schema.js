'use strict'

const Schema = use('Schema')

class BookSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments()
      table.string('isbn')
      table.string('title')
      table.integer('rating')
      table.integer('author_id').references('id').inTable('authors')
      table.integer('publisher_id').references('id').inTable('publishers')
      table.timestamps()
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BookSchema
