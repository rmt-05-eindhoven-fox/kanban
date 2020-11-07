const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')


class Controller {
    static register(req, res, next) {
        const { email, password } = req.body
        let newUser = {
            email,
            password
        }
        User.create(newUser)
        .then(data=>{
            res.status(201).json({data: `Your e-mail '${data.email}' successfully created`})
        })
        .catch(err=>{
            next(err)
        })
    }

    static login (req, res, next) {
        const { email, password } = req.body
        let payload = {
            email,
            password
        }
        User.findOne({where:{
            email : payload.email
        }})
        .then(user=>{
            if(!user){
                throw {status: 400, msg: 'Invalid email/password'}
            }else if(!comparePassword(payload.password, user.password)){
                throw {status: 400, msg: 'Invalid email/password'}
            }else{
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({access_token})
            }
        })
        .catch(err=>{
            next(err)
        })
    }

    static googleLogin (req, res, next) {
        const { id_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID)
        let email
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENT_ID
        })
        .then(ticket=>{
            const payload = ticket.getPayload()
            email = payload.email
            return User.findOne({
                where:{
                    email
                }
            })
        })
        .then(user=>{
            if(user){
                return user
            }else{
                return User.create({email, password: 'random'})
            }
        })
        .then(data=>{
            const access_token = signToken({id: data.id, email:data.email})
            res.status(200).json({access_token})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller