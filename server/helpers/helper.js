const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class Bcrypt {
  static hashPassword(data) {
    const salt = bcrypt.genSaltSync(+process.env.SALT)
    const hash = bcrypt.hashSync(data, salt)
    return hash
  }

  static comparePassword(data, hash) {
    return bcrypt.compareSync(data, hash)
  }
}

class JSONWebToken {

  static signToken(payload) {
    const token = jwt.sign(payload, process.env.KEY)
    return token
  }

  static verifyToken(token) {
    const decoded = jwt.verify(token, process.env.KEY)
    return decoded
  }
}

module.exports = {
  Bcrypt, JSONWebToken
}