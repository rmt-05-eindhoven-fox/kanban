const jwt = require('jsonwebtoken')

const signToken = (payload) => {
    const token = jwt.sign(payload, 'rahasiaa')
    return token
}

const verifyToken = (token) => {
    const decoded = jwt.verify(token, 'rahasiaa')
    return decoded
}

module.exports = {
    signToken,
    verifyToken
}