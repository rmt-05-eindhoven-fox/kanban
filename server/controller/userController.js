const { comparePassword } = require("../helpers/bcrypt")
const { signToken } = require("../helpers/jwt")
const { User } = require("../models")

class UserController {
  static async register(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }

      const register = await User.create(payload)
      res.status(201).json({ msg: `register success` })
    }
    catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const payload = {
        email: req.body.email,
        password: req.body.password
      }
      const user = await User.findOne({
        where: { email: payload.email }
      })

      if (!user) {
        throw { name: "WrongUserPassword" }
      } else if (!comparePassword(payload.password, user.password)) {
        throw { name: "WrongUserPassword" }
      } else {
        const access_token = signToken({
          id: user.id,
          email: user.email,
          first_name: user.first_name
        })
        res.status(200).json({ access_token, first_name:user.first_name })
      }

    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController