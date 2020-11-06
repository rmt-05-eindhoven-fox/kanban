const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { loginToken } = require('../helpers/jwt');
const { use } = require('../routers');
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async signup(req,res,next){
        let { first_name, last_name, email, password } = req.body;
        
        const newUser = {
            first_name, last_name, email, password
        }
        try { 
            const data = await User.create(newUser)
            // res.status(201).json(data)
            res.status(201).json(data)
        } catch (err){
            res.status(400).json(err)
            // next(err)
        }
    }

    static async login(req, res, next){
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

            if (!user) { 
                // throw {name: 'Wrong email/password'}
                res.status(401).json({
                    message: 'Wrong email/password'
                })
            }
            else if (!comparePassword(req.body.password, user.password)){ 
                // throw {name: 'Wrong email/password'}
                res.status(401).json({
                    message: 'Wrong email/password'
                })
            } else {
                const access_token = loginToken({
                    id: user.id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name
                })

                res.status(200).json({access_token});
            }
        } catch (err){
            res.status(400).json(err)
            // next(err)
        }
    }

    static googleLogin(req, res, next) {
        let { google_token } = req.body
        // console.log(google_token, "GOOOGLE TOKEN")
        const client = new OAuth2Client(process.env.CLIENT_ID);
        verify()
        async function verify() {
            try {
                const ticket = await client.verifyIdToken({
                    idToken: google_token,
                    audience: process.env.CLIENT_ID,
                });
                const payload = ticket.getPayload();
                // console.log(payload, "<<<<< PAYLOAD");
                let user = await User.findOne({
                    where: {
                        email: payload.email
                    }
                })
                if (!user) {
                    user = await User.create({
                        first_name: payload.given_name,
                        last_name: payload.family_name,
                        email: payload.email,
                        password: google_token
                    })
                }
                const access_token = loginToken({ 
                    id: user.id, 
                    first_name: user.first_name, 
                    last_name: user.last_name,
                    email: user.email })
                // console.log(access_token,"<<<<< ACCESS TOKEN")
                res.status(200).json({ access_token })
            } catch (err) {
                // console.log(err)
                next(err)
            }
        }
    }
}

module.exports = UserController;