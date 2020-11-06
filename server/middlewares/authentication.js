const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models/')

async function authentication (req, res, next) {
  const { access_token } = req.headers

  try {
    if (!access_token) {
      throw { msg: 'Authentication failed'}
    } else {
      const decoded = verifyToken(access_token)
      const user = await User.findOne({
        where: {
          email: decoded.email,
          id: decoded.id
        }
      })
      if (!user) {
        throw { msg: 'Authentication failed'}
      } else {
        req.loggedInUser = decoded
        next()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authentication