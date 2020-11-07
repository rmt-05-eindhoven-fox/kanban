const {User} = require('../models/index')
const { signToken } = require('../helper/jwt')
const {comparePassword} = require('../helper/bcrypt')

class UserContoller {
    static async register(req,res, next){
        try{
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            console.log(payload, "<<< payload register");
            const user = await User.create(payload)
            console.log(user, "<<< user register");
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        }
        catch(err){
            next(err)
        }
    }
    static async login(req,res, next){
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
            if(!user){
                res.status(401).json({
                    msg: "Wrong Email or Password"
                })
            } else if (!comparePassword(payload.password, user.password)){
                res.status(401).json({
                    msg: "Wrong email or Password"
                })
            }
             else {
                 const access_token = signToken({
                     id: user.id,
                     email: user.email
                 })
                 res.status(200).json({
                     access_token
                 })
            }
        } 
        catch (err) {
            next(err)
        }
    }
    static async googleLogin(req,res,next){
        let { google_access_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email = ''
   
        client.verifyIdToken({
            idToken: google_access_token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
         
        }).then(ticket => {
            const payload = ticket.getPayload();
            email = payload.email
            console.log(payload, "<<< ini payload dari data google");
            return User.findOne({
                where: { email }
            })
        
        }).then(user => {
            if (user) {
           
                return user
            } else {
                let objUser = {
                    email, 
                    password: "random"
                }
                return User.create(objUser)
            }
        })
            .then(dataUser => {
                let access_token = signToken({ id: dataUser.id, email: dataUser.email })
                return res.status(200).json(access_token)
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = UserContoller