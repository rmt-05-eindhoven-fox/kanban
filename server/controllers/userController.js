const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.create(payload)
      res.status(201).json({
        id: user.id,
        email: user.email
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
          email: user.email
        })
        res.status(200).json({
          access_token,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          profile_picture: user.profile_picture
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