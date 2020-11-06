const bcrypt = require('bcryptjs')

module.exports = class Bcrypt {
  static hash(data) {
    let salt = bcrypt.genSaltSync(Number(process.env.SALT))
    return bcrypt.hashSync(data, salt)
  }
  static compare(data, hash) {
    return bcrypt.compareSync(data, hash)
  }
}