const { User } = require("../models/index")
const { comparePassword } = require("../helpers/password.helper")
const { signToken } = require("../helpers/jwt.helper");
const { OAuth2Client } = require('google-auth-library');


class UserController {

    static async register(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.create(payload)
            res.status(201).json({
                id: user.id,
                email: user.email,
                message: "register success"
            })
        } catch (err) {
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
            });

            if (!user) {
                throw { name: "wrong email/password" }
            } else if (!comparePassword(payload.password, user.password)) {
                throw { name: "wrong email/password" }
            } else {
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({ access_token })
            }
        } catch (err) {
            next(err)
        }
    }

    static async googleLogin(req, res, next) {

        const google_token = req.body.access_token
        const client = new OAuth2Client(process.env.CLIENT_ID)
        try {
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID
            });
            const payload = ticket.getPayload()
            const user = await User.findOne({
                where: { email: payload.email }
            })
            let newUser;
            if (user) {
                newUser = user
            } else {
                let userObject = {
                    email: payload.email,
                    password: "random"
                }
                newUser = await User.create(userObject)
            }

            const access_token = signToken({
                id: newUser.id,
                email: newUser.email
            })
            res.status(200).json({ access_token })

        } catch (err) {
            next(err)
        }
    }

}

module.exports = UserController