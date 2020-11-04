const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.create(payload)
      res.status(201).json({
        id: user.id,
        username: user.username,
        password: user.password
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const option = {
        where: { email }
      }
      const user = await User.findOne(option)
      if (!user) {
        throw { msg: 'Wrong email or password', status: 401 }
      } else if (!comparePassword(password, user.password)) {
        throw { msg: 'Wrong email or password', status: 401 }
      } else {
        const access_token = signToken({
          id: user.id,
          username: user.username,
          email: user.email
        })
        res.status(200).json({
          username: user.username,
          email: user.email,
          access_token
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static googleLogin(req, res, next) {

  }
}

module.exports = UserController