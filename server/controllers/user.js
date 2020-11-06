const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      console.log("==== Registering ====");
      const email = req.body.email;
      const password = req.body.password;

      const payload = {
        email,
        password,
      };

      const user = await User.create(payload);

      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    console.log("==== Loging In ====");
    try {
      const email = req.body.email;
      const password = req.body.password;

      const payload = {
        email,
        password,
      };

      const user = await User.findOne({
        where: {
          email: payload.email,
        },
      });
      if (!user) {
        throw { message: `Invalid email/password`, status: 400 };
      } else if (!comparePassword(payload.password, user.password)) {
        throw { message: `Invalid email/password`, status: 400 };
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email,
        });

        res.status(200).json({ access_token });
      }
    } catch (err) {
      next(err);
    }
  }

  static async loginGoogle(req, res, next) {
    console.log(`==== Loging In with Google ====`);
    try {
      const google_token = req.body.google_token;
      const client = new OAuth2Client(process.env.CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const user = await User.findOne({
        where: {
          email: payload.email,
        },
      });
      if (user) {
        const access_token = signToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({ access_token });
      } else {
        const newUser = {
          email: payload.email,
          password: "randominaja",
        };
        const user = await User.create(newUser);
        const access_token = signToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({ access_token });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
