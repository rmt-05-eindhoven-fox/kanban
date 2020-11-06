const {User} = require('../models/index');
const {verifyPassword} = require('../helpers/bcrypt');
const {hashToken} = require('../helpers/jwt');

class UserController {
    static async register(req, res, next){
        try {
            let payload = {
                email: req.body.email,
                password: req.body.password
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
}

module.exports = UserController