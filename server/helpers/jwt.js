

const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

function generateToken(payload) {
  const token = jwt.sign(payload, secret)
  return token
}

function decodeToken(token){
  const decoded = jwt.verify(token, secret);
  return decoded
}

// test drive

const token = generateToken({ id : 13, email : 'kalonk13@mail.com'})
console.log(token)

console.log(decodeToken(token))

module.exports = { generateToken, decodeToken }