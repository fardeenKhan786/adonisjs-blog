"use strict";

const User = use("App/Models/User");

class AuthController {
  async register({ request, response }) {
    try {
      await User.create(request.all());
      return response.json({
        status: "success",
        message: "user registered"
      });
    } catch (error) {
      return response.json({
        status: "error",
        error
      });
    }
  }

  async login({ request, auth, response }) {
    let { email, password } = request.all();
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy("email", email);
        let token = await auth.generate(user);
        return response.json({
          status: "success",
          token: token
        });
      }
    } catch (e) {
      console.log(e);
      return response.json({
        status: "error",
        message: "you are not registered",
        e
      });
    }
  }

  async me({ request, auth, response }) {
    try {
      const user = await auth.getUser();
      return response.json({
        status: "success",
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    } catch (error) {
      return response.json({
        status: "error",
        error
      });
    }
  }
}

module.exports = AuthController;
