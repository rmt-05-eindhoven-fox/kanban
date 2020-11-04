const { User } = require('../models/')
const { Bcrypt, JSONWebToken } = require('../helpers/helper')

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
        res.status(200).json({ token, id: user.id })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController