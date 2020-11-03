const { User } = require("../models/")
const { validatingPassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class UserController {

    static async signup(req, res, next) {
        const { fullname, email, password } = req.body

        try {
            const result = await User.create({
                fullname,
                email,
                password
            })
            res.status(201).json({fullname, email})
        }
        catch(err) {
            next(err)
        }
    }
    
    static async signin(req, res, next) {
        const { email, password } = req.body

        try {
            const result = await User.findOne({
                where: {
                    email
                }
            })
            if(!result){
                throw {msg: 'email/password is invalid'}
            } else {
                if(!validatingPassword(password, result.password)){
                    throw {msg: 'email/password is invalid'}
                }
                else {
                    const access_token = generateToken({fullname: result.fullname, email: result.email})
                    res.status(200).json({access_token})
                }
            }
        }
        catch(err) {
            next(err)
        }
    }
}

module.exports = UserController