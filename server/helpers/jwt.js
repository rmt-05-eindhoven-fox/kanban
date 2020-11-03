const jwt = require('jsonwebtoken');
// require("dotenv").config()


function signToken(payload) {
  const token = jwt.sign(payload, 'randomsecret')
  return token
}

function verifyToken(token) {
  const decoded = jwt.verify(token, 'randomsecret')
  return decoded
}

module.exports = {
  signToken,
  verifyToken
}