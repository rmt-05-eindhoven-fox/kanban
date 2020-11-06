const { verifyToken } = require('../helper/jwt')
const { User } = require('../models')

async function authentication(req, res, next) {
  try {
    const token = req.headers.token
    if (!token) {
      throw ({ msg: 'Anda Belum login', status: 401 })
    } else {
      const hasilCekToken = verifyToken(token)
      const member = await User.findOne({
        where: {
          id: hasilCekToken.id
        }
      })
      if (!member) {
        throw ({ msg: 'Anda Belum login', status: 401 })
      } else {
        req.userActiv = hasilCekToken
        next()
      }
    }
  } catch (error) {

  }
}

module.exports = authentication