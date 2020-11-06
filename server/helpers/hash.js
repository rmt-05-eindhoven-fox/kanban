const bcrypt = require('bcryptjs')
const generator = require('generate-password')

const generatePassword = () => {
   return password = generator.generate({
      length: 13,
      numbers: true,
      symbols: true,
      strict: true
   })
}

const hashPassword = (password) => {
   let salt = bcrypt.genSaltSync(+process.env.SALT)
   let hash = bcrypt.hashSync(password, salt)

   return hash
}

const compareHash = (password, hash) => {
   return bcrypt.compareSync(password, hash)
}

module.exports = {hashPassword, compareHash, generatePassword}