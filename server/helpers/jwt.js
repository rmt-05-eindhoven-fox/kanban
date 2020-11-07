const jwt = require('jsonwebtoken')

function generateToken(data) {
  const access_token = jwt.sign(data, process.env.JWT_SECRET)
  return access_token
}

function verifyToken(data) {
  return jwt.verify(data, process.env.JWT_SECRET)
}

module.exports = { generateToken, verifyToken }