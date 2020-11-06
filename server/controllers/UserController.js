const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const user = require("../models/user");

class UserController {
	static async register(req, res, next) {
		try {
			const { email, password } = req.body;
			console.log( User, 'ngecek isi user')
			const newUser = await User.create({ email, password });

			return res.status(201).json({
				email: newUser.email,
			});
		} catch (err) {
			return next(err);
		}
	}

	static login(req, res, next) {
		let params = {
			where: {
				email: req.body.email,
			},
		};
    User.findOne(params)
    .then((data) => {
			if (data) {
				let validUser = comparePassword(req.body.password, data.password);
				if (validUser) {
					const access_token = generateToken(data);
					return res.status(200).json({ access_token });
				} else {
					throw { message: "invalid email / password", statusCode: 400 };
				}
			} else {
				throw { message: "invalid email / password", statusCode: 400 };
			}
		})
		.catch( (err) => {
			return next(err)
		})
	}
	
}


module.exports = UserController;
