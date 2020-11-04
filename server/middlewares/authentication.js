const { JSONWebToken } = require('../helpers/helper')
const { User } = require('../models/')

async function authentication(req, res, next) {
  const token = req.headers.token
  try {
    if (!token) {
      throw { message: 'authentication failed', status: 401 }
    } else {
      const decoded = await JSONWebToken.verifyToken(token)
      const user = await User.findOne({ where: { email: decoded.email } })
      if (!user) {
        throw { message: 'authentication failed', status: 401 }
      } else {
        req.loginCredential = decoded
        next()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authentication