const jwt = require('jsonwebtoken')

module.exports = class JWT {
  static create(data) {
    return jwt.sign(data, process.env.SECRET)
  }
  static extract(data) {
    return jwt.verify(data, process.env.SECRET)
  }
}