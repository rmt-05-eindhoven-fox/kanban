require('dotenv').config()
const jwt = require('jsonwebtoken');

function hashToken(payload){
    let token = jwt.sign(payload, "jwtrahasia");
    return token;
}

function verifyToken(token){
    let decoded = jwt.verify(token, "jwtrahasia");
    return decoded;
}

module.exports = { hashToken, verifyToken };
