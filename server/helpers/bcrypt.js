const bcrypt = require('bcryptjs')

function hashPassword(password) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  return hash
}

function verifyPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword)
}

module.exports = { hashPassword, verifyPassword }