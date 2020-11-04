const bcrypt = require('bcryptjs')

const hashPassword = (password) => {
   let salt = bcrypt.genSaltSync(+process.env.SALT)
   let hash = bcrypt.hashSync(password, salt)

   return hash
}

const compareHash = (password, hash) => {
   return bcrypt.compareSync(password, hash)
}

module.exports = {hashPassword, compareHash}