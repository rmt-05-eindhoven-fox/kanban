const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt.js");
const { signToken } = require("../helpers/jwt.js");
const { OAuth2Client } = require("google-auth-library");

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
					name: user.name,
					email: user.email,
					access_token
				})
			}

		} catch(err) {
			next(err)
		}
	}

	static googleLogin(req, res, next) {
		let { google_access_token } = req.body;
		let email = null;

		const client = new OAuth2Client(process.env.CLIENT_ID);

		client.verifyIdToken({
			idToken: google_access_token,
			audience: process.env.CLIENT_ID
		})
		.then(data => {
			let payload = data.getPayload()
			email = yaload.email;

			return User.findOne({
				wjere: {
					where: payload.email
				}
			})
		})
		.then(user => {
			if (user) {
				return user

			} else {
				let userData = {
					email,
					password: "qwertyasdfgh"
				}

				return User.create(userData)
			}
		})
		.then(data => {
			let access_token = signToken({
				id: data.id,
				email: data.email
			})

			return res.status(200).json({
				access_token,
				email
			})
		})
		.catch(err => {
			next(err)
		})
	}

}

module.exports = UserController;