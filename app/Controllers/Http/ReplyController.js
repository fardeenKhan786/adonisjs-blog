"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Reply = use("App/Models/Reply");
const Comment = use("App/Models/Comment");

/**
 * Resourceful controller for interacting with replies
 */
class ReplyController {
  /**
   * Show a list of all replies.
   * GET replies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, params: { comment_id }, response, view }) {
    try {
      const replies = await Comment.query().with("replies", function(builder) {
        builder.select("replies.id", "replies.content");
      });
      return response.json({
        status: "success",
        replies: replies
      });
    } catch (error) {
      return response.json({
        status: "error",
        error: error
      });
    }
  }

  /**
   * Render a form to be used for creating a new reply.
   * GET replies/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new reply.
   * POST replies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, params: { comment_id }, auth, response }) {
    try {
      const user = await auth.getUser();
      const comment = await Comment.findByOrFail("id", comment_id);
      const data = request.all();
      Object.assign(data, { comment_id: comment_id });
      const reply = await user.replies().create(request.all());
      return response.json({
        status: "success",
        reply: reply
      });
    } catch (error) {
      return response.json({
        status: "error",
        error
      });
    }
  }

  /**
   * Display a single reply.
   * GET replies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing reply.
   * GET replies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update reply details.
   * PUT or PATCH replies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a reply with id.
   * DELETE replies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = ReplyController;
