

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


module.exports = { generateToken, decodeToken }