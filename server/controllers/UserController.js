const {User} = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class UserController {
  static async register(req, res, next) {
    const { password, email, first_name, last_name } = req.body
    const payload = {
      email,
      password, 
      first_name,
      last_name
    }
    try {
      const user = await User.create(payload)
      const result = {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      }
      res.status(200).json(result)
    } catch (err) {
      // console.log(err);
      // return res.status(500).json(err.name)
      next(err)
    }
  }

  static async login(req, res, next) {
    const { password, email } = req.body
    // console.log({ password, email });
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
          const data = {
            access_token,
            first_name: user.first_name,
            last_name: user.last_name
          }
          res.status(200).json(data)
        }
      }
    } catch (err) {
      // console.log(err);
      // return res.status(500).json(err.name)
      next(err)
    }
  }
}

module.exports = UserController