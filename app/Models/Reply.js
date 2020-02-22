"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Reply extends Model {
  comment() {
    return this.belongsTo("App/Models/Comment");
  }
}

module.exports = Reply;
