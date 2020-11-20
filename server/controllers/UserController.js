const { User } = require('../models/index');
const { hashToken } = require('../helpers/jwt');
const { validatePassword } = require('../helpers/bcrypt');
const {OAuth2Client} = require('google-auth-library');

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

    static googleLogin (req, res, next){
        let { google_access_token } = req.body;
        const client = new OAuth2Client("907101746187-a8pivieuh6aj6ct00cg76r9qpc8tq14l.apps.googleusercontent.com");
        let username, email = '';
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket => {
            const payload = ticket.getPayload();
             username = payload.email;
             email = payload.email;

            return User.findOne({where: {email}})
        })
        .then(user => {
            if(user){
                return user;
            } else {
                let newUser = {
                    username: username,
                    email: email,
                    password: '123456789'
                }
                return User.create(newUser);
            }
        })
        .then(data => {
            const token = {
                id: data.id,
                username: data.username,
                email: data.email
            }
            const access_token = hashToken(token);
            res.status(200).json({access_token});
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = UserController