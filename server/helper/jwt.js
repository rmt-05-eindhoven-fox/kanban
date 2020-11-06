const jwt = require('jsonwebtoken')

function getToken(object) {
  const token = jwt.sign(object, process.env.SECRET)
  return token
}

function verifyToken(token) {
  const decode = jwt.verify(token, process.env.SECRET)
  return decode
}

module.exports = { getToken, verifyToken }