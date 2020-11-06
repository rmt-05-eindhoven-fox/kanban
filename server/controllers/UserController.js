const {
   User
} = require('../database/models')
const {
   compareHash,
   generatePassword
} = require('../helpers/hash')
const {
   signToken
} = require('../helpers/access_token')
const {
   OAuth2Client
} = require('google-auth-library');

class UserController {
   static async register(req, res, next) {
      try {
         const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
         }

         const user = await User.create(newUser)

         res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email
         })
      } catch (err) {
         next(err)
      }
   }

   static async login(req, res, next) {
      try {
         const userInfo = {
            email: req.body.email,
            password: req.body.password
         }

         const user = await User.findOne({
            where: {
               email: userInfo.email
            }
         })

         if (!user) {
            throw {
               status: 400,
               message: `Email/password didn't match`
            }
         } else if (!compareHash(userInfo.password, user.password)) {
            throw {
               status: 400,
               message: `Email/password didn't match`
            }
         } else {
            const access_token = signToken({
               id: user.id,
               name: user.name,
               email: user.email
            })

            // console.log(access_token);
            res.status(201).json({
               access_token
            })
         }
      } catch (err) {
         next(err)
      }
   }

   static async googleLogin(req, res, next) {
      const idToken = req.body.idToken

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      try {
         const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID
         })

         const payload = ticket.getPayload();

         const user = await User.findOne({
            where: {
               email: payload.email
            }
         })

         if (!user) {
            const newUser = {
               username: payload.name,
               email: payload.email,
               password: generatePassword()
            }

            const createUser = await User.create(newUser)

            const access_token = signToken({
               id: createUser.id,
               username: createUser.username,
               email: createUser.email
            })

            res.status(200).json({
               access_token
            })
         } else {
            const access_token = signToken({
               id: user.id,
               username: user.username,
               email: user.email
            })

            res.status(200).json({
               access_token
            })
         }

         // console.log(payload);
      } catch (err) {
         next(err)
      }
   }
}

module.exports = UserController