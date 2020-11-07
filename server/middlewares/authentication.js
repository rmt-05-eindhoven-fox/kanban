const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

module.exports = async function (req, res, next) {
  const {access_token} = req.headers
  try {
    if (!access_token) {
      throw { msg: 'authentication failed!', status: 401}
    } else {
      const decoded = verifyToken(access_token)
      const user = await User.findOne({where: {email: decoded.email}})
      if (!user) {
        throw { msg: 'Authentication failed!', status: 401}
      } else {
        req.userLoggedIn = {
          id: decoded.id,
          email: decoded.email
        }
        next()
      }
    }
  } catch (err) {
    // console.log(err);
    next(err)
  }
}