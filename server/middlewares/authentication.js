const JWT = require('../helpers/jwt')
const { User } = require('../models')

module.exports = async (req, res, next) => {
  try {
    let { access_token } = req.headers
    let data = JWT.extract(access_token)
    let found = await User.findByPk(data.id) 
    if(!found) throw { msg: "User not existed" }
    else {
      req.user = { id: found.id, email: found.email}
      console.log(req.user);
      next()
    }
  } catch (error) {
    res.status(404).json(error)
  }
}