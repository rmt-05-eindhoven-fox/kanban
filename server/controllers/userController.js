const { User } = require("../models/index.js")
const { comparePassword } = require('../helper/bcrypt.js')
const { signToken } = require("../helper/jwt.js")
const { OAuth2Client } = require('google-auth-library')


class UserController {
    static register(req, res, next){
        console.log(req.body)
        const { email, password } = req.body
        User.create({
            email,
            password
        })
        .then(user => {
            res.status(201).json({
                id: user.id,
                email:user.email
            })
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res){
        const playload = {
            email: req.body.email,
            password: req.body.password
        }
        
        User.findOne({
            where: {
                email: playload.email
            }
        })
        .then(user => {
            if(!user){
                res.status(401).json({
                    message: 'wrong email/password'
                })
            } else if (!comparePassword(playload.password, user.password)){
                res.status(401).json({
                    message: 'wrong email/password'
                })
            } else {
                const tokenAkses = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    tokenAkses : tokenAkses,
                    email: user.email
                })
            }
        })
        .catch(err => {
            next(err)
        })
    }

  static googleLogin(req, res, next) {
    let { google_access_token } = req.body
    const client = new OAuth2Client('73778169427-l80ckpaf02m9lofa9uat9k7sdd0dum43.apps.googleusercontent.com')
    let email = '';

    client.verifyIdToken({
      idToken: google_access_token,
      audience: '73778169427-l80ckpaf02m9lofa9uat9k7sdd0dum43.apps.googleusercontent.com'
    })
      .then(tiket => {
        let payload = tiket.getPayload();
        
        email = payload.email;
        return User.findOne({ 
            where: { 
                email: payload.email 
            } 
        })
      })
      .then(user => {
        if (user) {
          //gnerateToken
          return user
        } else {
          let userObj = {
            email,
            password: 'random'
          }
          return User.create(userObj)
        }
        
      })
      .then(dataUser => {
        let access_token = signToken({
            id: dataUser.id, 
            email: dataUser.email 
        })
        return res.status(200).json({
            access_token
        })
      })
      .catch(err => {
        next(err)
      })
  }
}

  module.exports = UserController