const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

function authentication (req, res, next) {
  const { access_token } = req.headers
    const decoded = verifyToken(access_token)
    User.findOne({

      where: {
        email:decoded.email
      }
    })
    .then(user => {
      if(!user) throw{
        msg: 'Authentication Failed!'
      }
      req.loggedIn = decoded
    next()
  
  }) .catch (err => {
    next(err)
  })
}

module.exports = authentication
