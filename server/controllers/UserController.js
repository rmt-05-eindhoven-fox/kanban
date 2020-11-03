const {User} = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
  static async register(req, res, next) {
    const { password, email } = req.body
    const payload = {
      email,
      password
    }
    try {
      const user = await User.create(payload)
      const result = {
        id: user.id,
        email: user.email
      }
      res.status(200).json(result)
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }

  static async login(req, res, next) {
    const { password, email } = req.body
    try {
      const user = await User.findOne({where: { email: email}})
      if (!user) {
        throw { msg: 'Wrong email/password!', status: 400}
      } else {
        if (!checkPassword(password, user.password)) {
          throw { msg: 'wrong email/password!', status: 400}
        } else {
          const payload = { id: user.id, email: user.email }
          const access_token = signToken(payload)
          // req.userLoggedIn????
          // authentication dapet dari?
          res.status(200).json({access_token})
        }
      }
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }
}

module.exports = UserController