const { User } = require('../models')
const { comparePassword } = require('../helper/bcrypt')
const { getToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')

class ControllerUser {
  static async register(req, res, next) {
    try {
      const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }
      const result = await User.create(newUser)
      res.status(200).json(result)
    } catch (error) {
      next(error)
      // res.status(500).json(error.errors[0].message)    // error.name = "SequelizeUniqueConstraintError || SequelizeValidationError"
    }
  }

  static async login(req, res, next) {
    try {
      const userLogedIn = {
        email: req.body.email,
        password: req.body.password
      }
      const result = await User.findOne({
        where: {
          email: userLogedIn.email
        }
      })
      if (!result) {
        throw ({ msg: "wrong email/password", status: 401 })
      } else {
        const cekPassword = comparePassword(userLogedIn.password, result.password)
        if (!cekPassword) {
          throw ({ msg: "wrong email/password", status: 401 })
        } else {
          const token = getToken({
            id: result.id,
            email: result.email
          })
          res.status(200).json({ token, name: result.name, id: result.id })
        }
      }
    } catch (error) {
      next(error)
    }
  }
  static async postGoogleLogin(req, res, next) {
    const google_access_token = req.body.idToken
    const client = new OAuth2Client(process.env.CLIENT_ID)
    let email = ""
    let userName = ""
    let payload;
    // verify google token berdasarkan client id
    client.verifyIdToken({
      idToken: google_access_token,
      audience: process.env.CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload()
        //console.log(payload)
        email = payload.email
        userName = payload.name
        // hasil dari payload = email, name, picture,
        return User.findOne({
          where: {
            email: payload.email
          }
        })
      })
      .then(user => {
        if (user) {
          return user
        } else {
          let newUser = {
            name: userName,
            email: email,
            password: 'random'
          }
          return User.create(newUser)
        }
      })
      .then(user => {
        const name = user.name
        let accessToken = getToken({
          id: user.id,
          email: user.email
        })
        res.status(200).json({
          token: accessToken,
          name: name
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = ControllerUser