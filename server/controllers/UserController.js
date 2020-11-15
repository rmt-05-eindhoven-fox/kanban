const { User } = require('../models/index');
const { hashToken } = require('../helpers/jwt');
const { validatePassword } = require('../helpers/bcrypt');

class UserController {
    static async register (req, res, next) {
        try {
            const payload = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.create(payload);
            res.status(201).json(user);
        } catch (error) {
            next(error)
        }
    }
    static async login (req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.findOne({ where: { email: payload.email } })
            if (!user) {
                throw { message: 'Wrong email/password!', status: 401 }
            } else {
                if (validatePassword(payload.password, user.password)) {
                    const token = {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                    const access_token = hashToken(token);
                    res.status(200).json({access_token});
                } else {
                    throw { message: 'Wrong email/password!', status: 401 }
                }
            }
        } catch (error) { 
            next(error)
        }
    }
}

module.exports = UserController