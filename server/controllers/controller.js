const { User } = require('../models')

const { comparePassword} = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class Controller {
    static async register(req,res) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.create(payload)
            res.status(201).json({
                id: user.id,
                email: user.email
            })
        } catch (error) {  
            res.status(500).json(error)
        }
    }

    static async login(req,res) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            //console.log(payload)

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if(!user) {
                res.status(401).json({
                    message: 'Invalid email/password'
                })
            } else if (!comparePassword(payload.password, user.password)) {
                res.status(401).json({
                    message: 'Invalid email/password'
                })
            } else {
                const tokenAccess = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({tokenAccess})
            }
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
}

module.exports = Controller