const jwt = require("jsonwebtoken")

function signToken(payload){
  const token = jwt.sign(payload, 'chum is fum');
  return token
}

function verifyToken(token){
  const decoded = jwt.verify(token, 'chum is fum');
  return decoded
}

module.exports = {signToken,verifyToken}
