"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CommentSchema extends Schema {
  up() {
    this.create("comments", table => {
      table.increments();
      table.string("content").notNullable();
      table.timestamps();
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("Users.id");
      table.integer("post_id").unsigned();
      table.foreign("post_id").references("Posts.id");
    });
  }

  down() {
    this.drop("comments");
  }
}

module.exports = CommentSchema;
