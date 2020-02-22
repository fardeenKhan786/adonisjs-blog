"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ReplySchema extends Schema {
  up() {
    this.create("replies", table => {
      table.increments();
      table.string("content").notNullable();
      table.integer("comment_id").unsigned();
      table.foreign("comment_id").references("Comments.id");
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("Users.id");
      table.timestamps();
    });
  }

  down() {
    this.drop("replies");
  }
}

module.exports = ReplySchema;
