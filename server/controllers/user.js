const { User } = require('../models/')
const { Bcrypt, JSONWebToken } = require('../helpers/helper')
const { OAuth2Client } = require('google-auth-library');

class UserController {

  static async register(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const register = await User.create(payload)

      res.status(201).json({
        id: register.id,
        email: register.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      const user = await User.findOne({ where: { email: payload.email } })
      if (!user) {
        throw { message: 'wrong email/password', status: 404 }
      } else if (!Bcrypt.comparePassword(payload.password, user.password)) {
        throw { message: 'wrong email/password', status: 401 }
      } else {
        const token = JSONWebToken.signToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({ token, email: user.email })
      }
    } catch (error) {
      next(error)
    }
  }

  static async googleLogin(req, res, next) {
    let id_token = req.body.token
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
    const client = new OAuth2Client(CLIENT_ID);
    try {
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      let user = await User.findOne({
        where: {
          email: payload.email
        }
      })
      if (!user) {
        user = await User.create({
          email: payload.email,
          password: id_token
        })
      }
      let token = JSONWebToken.signToken({ id: user.id, email: user.email })
      console.log(token)
      res.status(200).json({ token, email: user.email })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController