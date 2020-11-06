const {
  comparePassword
} = require('../helpers/bcrypt')
const {
  User
} = require('../models/index')
const {
  generateToken
} = require('../helpers/jwt')
const {
  OAuth2Client
} = require('google-auth-library');


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
          access_token: userToken,
          full_name: user.full_name,
          email: user.email
        })
      }
    } catch (error) {
      next(error)
    }
  }

  static async postLoginGoogle(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.GOOGLE_ID)
      const {
        google_access_token
      } = req.headers
      const ticket = await client.verifyIdToken({
        idToken: google_access_token,
        audience: process.env.GOOGLE_ID
      })

      const payload = ticket.getPayload()

      let {
        name,
        email
      } = payload
      const password = 'defaultPassword'

      let user = await User.findOne({
        where: {
          email
        }
      })

      if (!user) {
        user = await User.create({
          name,
          email,
          password
        })

      }

      const access_token = generateToken({
        id: user.id,
        email: user.email
      })

      res.status(200).json({
        access_token,
        email
      })

    } catch (error) {
      next(error)
    }


  }
}

module.exports = UserController