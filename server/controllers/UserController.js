const {User} = require('../database/models')
const {compareHash} = require('../helpers/hash')
const {signToken} = require('../helpers/access_token')

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

         if(!user) {
            throw {status: 400, message: `Email/password didn't match`}
         } else if (!compareHash(userInfo.password, user.password)){
            throw {status: 400, message: `Email/password didn't match`}
         } else {
            const access_token = signToken({
               id: user.id,
               name: user.name,
               email: user.email
            })

            res.status(201).json({access_token})
         }
      } catch (err) {
         next(err)
      }
   }
}

module.exports = UserController