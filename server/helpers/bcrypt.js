const bcrypt = require('bcrypt')

function hashPass(password) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

function comparePass(password, hash) {
  const compare = bcrypt.compareSync(password, hash)
  return compare
}

module.exports = { hashPass, comparePass }