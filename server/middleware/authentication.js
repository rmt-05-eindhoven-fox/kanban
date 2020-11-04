const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
  const {access_token} = req.headers
  try {
    if (!access_token) {
      throw {msg: 'Authentication failed', status: 401}
    } else {
      const decoded = verifyToken(access_token);
      const user = await User.findOne({
        where: {
          // email: decoded.email
          username: decoded.username
        }
      })
      if (!user) {
        throw {msg: 'Authentication failed', status: 401}
      } else {
        req.loggedInUser = decoded;
        next()
      }
    }
  } catch(error) {
    next(error)
  }
}

module.exports = authentication