'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('content').notNullable()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('Users.id')
      table.integer('category_id').unsigned()
      table.foreign('category_id').references('Categories.id')
      table.timestamps()
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostSchema
