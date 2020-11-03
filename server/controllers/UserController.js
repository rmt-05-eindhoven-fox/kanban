const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");

class UserController {
	static async register(req, res, next) {
		try {
			const payload = {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			}

			const user = await User.create(payload);

			res.status(201).json({
				id: user.id,
				name: user.name,
				email: user.email
			})

		} catch(err) {
			next(err)
		}
	}

	static async login(req, res, next) {
		try {
			const payload = {
				email: req.body.email,
				password: req.body.password
			}

			const user = await User.findOne({
				where: {
					email: payload.email
				}
			})

			if(!user) {
				throw { name: "AuthenticationFailed" }

			} else if (!comparePassword(payload.password, user.password)) {
				throw { name: "AuthenticationFailed" }

			} else {
				const access_token = signToken({
					id: user.id,
					name: user.name,
					email: user.email
				})

				res.status(200).json({
					email: user.email,
					access_token
				})
			}

		} catch(err) {
			next(err)
		}
	}
}

module.exports = UserController;