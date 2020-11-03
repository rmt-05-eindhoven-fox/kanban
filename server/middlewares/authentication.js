const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt.js");

async function authentication(req, res, next) {
	try {
		const { access_token } = req.headers;

		if (!access_token) {
			throw { name: "AuthenticationFailed" }
		} else {
			const decoded = verifyToken(access_token);

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
