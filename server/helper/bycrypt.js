const bcryptjs = require('bcryptjs');

function hashPassword(password) {
  const salt = bcryptjs.genSaltSync(process.env.SALT);
  const hash = bcryptjs.hashSync(password, salt)
  return hash;
}

function comparePassword(password, hash) {
  const match = bcryptjs.compareSync(password, hash);
  return match;
}

module.exports = {
  hashPassword, comparePassword
}