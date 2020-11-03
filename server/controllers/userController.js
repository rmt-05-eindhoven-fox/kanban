const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePass } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

class UserController {
  static register(req, res, next) {
    const form = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    User.create(form)
      .then(result => {
        res.status(201).json({ id: result.id, email:result.email, msg:'Register success!' })
      })
      .catch(err => {
        next(err)
      })
  }

  static login(req, res, next) {
    const form = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({ where: { email: form.email } })
      .then(result => {
        if (!result) {
          throw { code: 404, msg: 'Invalid email/password' }
        } else {
          const compare = comparePass(form.password, result.password)
          if (!compare) {
            throw { code: 404, msg: 'Invalid email/password' }
          } else {
            const access_token = generateToken({ id: result.id, email: result.email })
            res.status(200).json({ id: result.id, access_token: access_token })
          }
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static googleSign(req, res, next) {
    let payload
    let data
    client
      .verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        payload = ticket.getPayload()
        data = {
          name: payload.name,
          email: payload.email,
          password: process.env.DEFAULT_PASS
        }
        return User.findOne({ where: { email: payload.email } })
      })
      .then(result => {
        if (result) {
          const access_token = generateToken({ id: result.id, email: result.email })
          res.status(200).json({
            id: result.id,
            access_token: access_token
          })
        } else {
          return User.create(data)
        }
      })
      .then(data => {
        const access_token = generateToken({ id: data.id, email: data.email })
        res.status(200).json({
          result: data,
          access_token: access_token
        })
      })
      .catch(err => {
        next(err)
      })
  }

}

module.exports = UserController
