const { User } = require('../models')

const {comparePassword} = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
require("dotenv").config()

class UserController {

    // Register, Login
    static async register(req, res, next) {
      try {
        const credentials = {
          email: req.body.email,
          username: req.body.username,
          password: req.body.password
        }
  
        const user = await User.create(credentials)
  
        res.status(201).json({
          id: user.id,
          email: user.email,
          username: user.username,
        })
      } catch (error) {
        console.log(error)
        next(error)
      }
    }
  
    static async login(req, res, next) {
      try {
        const credentials = {
          // email: req.body.email,
          username: req.body.username,
          password: req.body.password
        }
  
        const user = await User.findOne({
          where: {
            // email: credentials.email
            username: credentials.username
          }
        })
  
        if (!user) {
          res.status(401).json({
            message: 'Invalid username or password'
          })
        } else if (!comparePassword(credentials.password, user.password)) {
          res.status(401).json({
            message: 'Invalid username or password'
          })
        } else {
          const access_token = signToken({
            id: user.id,
            // email: user.email,
            username: user.username,
          })
  
          res.status(200).json({
            access_token
          })
        }
      } catch (error) {
        console.log(erroe)
        next(error)
      }
    }

    static googleLogin(req, res, next) {
      let {google_access_token} = req.body
      let email;

      const client = new OAuth2Client(process.env.GOOGLE_ID);
      client.verifyIdToken({
        idToken: google_access_token,
        audience: process.env.GOOGLE_ID,
      })
      .then(ticket => {
        let payload = ticket.getPayload()
        email = payload.email
        return User.findOne({
          where: {
            email:email
          }
        })
        // console.log(payload)
      })
      .then(user => {
        if(user) {
          return user
        } else {
          return User.create({
            email:email,
            password: 'random'
          })
        }
      })
      .then(dataUser => {
        let access_token = signToken({
          id: dataUser.id,
          email: dataUser.email
        })
        res.status(200).json({access_token})
      })
      .catch(error => {
        console.log(error)
      })
    }
}

module.exports = UserController