const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt.js");

async function authentication(req, res, next) {
	try {
		const { token } = req.headers;

		if (!token) {
			throw { name: "AuthenticationFailed" }
		} else {
			const decoded = verifyToken(token);

			const user = await User.findOne({
				where: {
					email: decoded.email
				}
			})

			if (!user) {
				throw { name: "AuthenticationFailed" }

			} else {
				req.loggedInUser = decoded;
				next()
			}
		}
		
	} catch(err) {
		next(err)
	}
}

module.exports = authentication;
