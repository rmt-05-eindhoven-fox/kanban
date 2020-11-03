require('dotenv').config()
const jwt = require('jsonwebtoken');

function hashToken(payload){
    let token = jwt.sign(payload, process.env.SECRET);
    return token;
}

function verifyToken(token){
    let decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
}

module.exports = { hashToken, verifyToken };
