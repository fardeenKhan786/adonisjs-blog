"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.post("register", "AuthController.register").prefix("/api/v1");
Route.post("login", "AuthController.login").prefix("/api/v1");
Route.get("me", "AuthController.me")
  .prefix("/api/v1")
  .middleware("auth");

Route.get("categories", "CategoryController.index").prefix("/api/v1");
Route.post("categories", "CategoryController.store")
  .prefix("/api/v1")
  .middleware("auth");
Route.put("categories/edit/:id", "CategoryController.update")
  .prefix("/api/v1")
  .middleware("auth");

Route.get("posts", "PostController.index").prefix("/api/v1");
Route.get("posts/:page_id", "PostController.posts_paginate").prefix("/api/v1");
Route.get("post/:id", "PostController.show").prefix("/api/v1");
Route.get("posts/category/:id", "PostController.byCategory").prefix("/api/v1");
Route.post("posts", "PostController.store")
  .prefix("/api/v1")
  .middleware("auth");
Route.put("posts/:id", "PostController.update")
  .prefix("/api/v1")
  .middleware("auth");
Route.get("posts/comment", "CommentController.index");

Route.post("posts/comment", "CommentController.store")
  .prefix("/api/v1")
  .middleware("auth");
Route.post("comment/reply/:comment_id", "ReplyController.store")
  .prefix("/api/v1")
  .middleware("auth");
