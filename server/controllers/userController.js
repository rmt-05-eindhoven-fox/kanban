const {
  comparePassword
} = require('../helpers/bcrypt')
const {
  User
} = require('../models/index')
const {
  generateToken
} = require('../helpers/jwt')

class UserController {
  static async postRegister(req, res, next) {
    try {
      const {
        full_name,
        email,
        password
      } = req.body

      const newUser = await User.create({
        full_name,
        email,
        password
      })

      const output = {
        id: newUser.id,
        full_name: newUser.full_name,
        email: newUser.email
      }

      res.status(201).json(output)
    } catch (error) {
      next(error)
    }
  }

  static async postLogin(req, res, next) {
    try {
      const {
        email,
        password
      } = req.body

      const user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        res.status(400).json({
          message: 'Wrong password or username!'
        })
      } else if (!comparePassword(password, user.password)) {
        res.status(401).json({
          message: 'Wrong password or username!'
        })
      } else {
        const userToken = generateToken({
          id: user.id,
          full_name: user.full_name,
          email: user.email
        })
        res.status(200).json({
          access_token: userToken
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController