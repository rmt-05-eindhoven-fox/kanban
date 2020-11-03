const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')


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
}

module.exports = Controller