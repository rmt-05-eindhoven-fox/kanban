const { decodeToken } = require('../helpers/jwt')
const { User } = require('../models/')

async function authentication(req, res, next){
  /**
   * Check if access_token exists in headers
   * Check if user exists in our db
   */

  try {
    let { access_token } = req.headers


    if(access_token){
      let { id, email, iat } = decodeToken(access_token)
      const user = await User.findOne({ where : { email }})
  
      if(user){
        req.loggedInUser = { id, email }
        next()
  
      } else {
  
        next({
          status : 400,
          message : `User not found`
        })
      }
      
    } else {
      next({
        status : 401,
        message : `Unauthorized`
      })
    }
    
  } catch (error) {
    next(error)
  }

}

module.exports = authentication