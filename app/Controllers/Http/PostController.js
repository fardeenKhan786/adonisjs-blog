'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    try {
      const posts = await Post.query()
        .with('author', function (builder) {
          builder.select('Users.id', 'Users.name', 'Users.email')
        })
        .with('category', function (builder) {
          builder.select('Categories.id', 'Categories.name')
        })
        .fetch()
      return response.json({
        status: 'success',
        posts: posts
      })
    } catch (error) {
      return response.json({
        status: 'error'
      })
    }

  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    try {
      const user = await auth.getUser()
      const post = await user.posts().create(request.all())
      return response.json({
        status: 'success',
        message: 'post created'
      })
    } catch (error) {
      return response.json({
        status: 'error'
      })
    }
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response, view }) {
    try {
      const post = await Post.query()
        .where('id', id)
        .with('author', function (builder) {
          builder.select('Users.id', 'Users.name', 'Users.email')
        })
        .with('category', function (builder) {
          builder.select('Categories.id', 'Categories.name')
        })
        .first()
      return response.json({
        status: 'success',
        post: post
      })
    } catch (error) {
      return response.json({
        status: 'error'
      })
    }
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, auth, request, response }) {

    try {
      const user = await auth.getUser()
      const { content, category_id } = request.all()
      const post = await Post.findBy('id', id)
      post.content = content
      post.category_id = category_id || post.category_id
      await post.save()
      return response.json({
        status: 'success',
        message: 'post updated',
        post: post
      })
    } catch (error) {
      return response.json({
        status: 'error',
        message: 'failed to update post'
      })
    }
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
  }


  // post by category id
  async byCategory({ params: { id }, response }) {
    const posts = await Post.query()
      .where('category_id', id)
      .with('author', function (builder) {
        builder.select('Users.id', 'Users.name', 'Users.email')
      })
      .with('category', function (builder) {
        builder.select('Categories.id', 'Categories.name')
      })
      .fetch()
    return response.json({
      status: 'success',
      posts: posts
    })
  }

}

module.exports = PostController
