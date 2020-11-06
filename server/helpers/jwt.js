const jwt = require("jsonwebtoken");

//to obtain token
function signToken(payload) {
	const token = jwt.sign(payload, process.env.SECRET)

	return token
}

//to decode token
function verifyToken(token) {
	const decoded = jwt.verify(token, process.env.SECRET)

	return decoded
}

module.exports = {
	signToken,
	verifyToken
}