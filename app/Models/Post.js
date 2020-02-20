'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

	author() {
		return this.belongsTo('App/Models/User')
	}

	category() {
		return this.belongsTo('App/Models/Category')
	}

}

module.exports = Post
