const jwt = require("jsonwebtoken")

module.exports = {
    signToken(payload) {
        return jwt.sign(payload, "secrets")
    },

    verifyToken(token) {
        return jwt.verify(token, "secrets")
    }
}
