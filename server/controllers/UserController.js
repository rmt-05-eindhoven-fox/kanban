const {User} = require('../models/index');
const {verifyPassword} = require('../helpers/bcrypt');
const {hashToken} = require('../helpers/jwt');
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async register(req, res, next){
        try {
            let payload = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                userImage: req.body.userImage
            }
            let user = await User.create(payload);
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next){
        try {
            let payload = {
                email: req.body.email,
                password: req.body.password
            }
            let user = await User.findOne({where: {email: payload.email}});
            if(!user){
                throw { message: "Email/password salah", status: 401};
            } else {
                if(!verifyPassword(payload.password, user.password)){
                    throw { message: "Email/password salah", status: 401};
                } else {
                    let token_payload = {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                    let access_token = hashToken(token_payload);
                    res.status(200).json({access_token});
                }
            }
        } catch (err) {
            next(err);
        }
    }

    static async getUser(req, res, next){
        try {
            console.log(req.loggedIn);
            res.status(200).json(req.loggedIn);
        } catch (error) {
            next(error);
        }
    }

    static googleLogin (req, res, next){
        let { google_access_token } = req.body;
        const client = new OAuth2Client(process.env.CLIENT_ID);
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
            let access_token = hashToken({id: data.id, email: data.email});
            res.status(200).json({access_token});
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = UserController