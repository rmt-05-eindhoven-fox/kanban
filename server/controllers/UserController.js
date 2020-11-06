const {User} = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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

  static async loginGoogle(req, res, next) {
    const { access_token } = req.body
    try {
      const ticket = await client.verifyIdToken({
        idToken: access_token,
        audience: process.env.CLIENT_ID,
      });
      const payload = ticket.getPayload();
      // console.log(payload);
      let user = await User.findOne({where: {email: payload.email}})
      if (!user) {
        const createUser = {
          email: payload.email,
          password: process.env.PASS_USER_GOOGLE,
          first_name: payload.given_name || 'unknown',
          last_name: payload.family_name || payload.given_name,
        }
        user = await User.create(createUser)
      }
      const payload_token = { id: user.id, email: user.email }
      const access_token_google_login = signToken(payload_token)
      const data = {
        access_token: access_token_google_login,
        first_name: user.first_name,
        last_name: user.last_name
      }
      res.status(200).json(data)
    } catch (err) {
      console.log(err, 'errorz');
      next(err)
    }
  }
}

module.exports = UserController