const { User, Todo } = require('../models')


const { comparePassword} = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')
const { sign } = require('jsonwebtoken')
const { ne } = require('sequelize/types/lib/operators')

class Controller {
    static async register(req,res, next) {
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
            //res.status(500).json(error)
            next(error)
        }
    }

    static async login(req,res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        try {
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
                //console.log(tokenAccess, 'ini token controller')
                res.status(200).json({tokenAccess})
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async create(req,res, next) {
        try {
            const UserId = req.loggedInUser.id
            //console.log(UserId, 'ini user')
            const { title, description, category} = req.body
            const todo = await Todo.create({title, description, category, UserId})
            res.status(201).json({todo})
        } catch (error) {
            console.log(error, 'error dari create')
            next(error)
        }
    }

    static async findAll (req, res, next) {
        const UserId = req.loggedInUser.id
        try {
            const todo = await Todo.findAll({
                where: {
                    UserId
                }
            })
            res.status(200).json({todo})
        } catch (error) {
            console.log(error, 'eror dari controller')
            next(500).json(error)
        }
    }

    static async edit(req,res,next) {
        try {
            const {title, description, category} = req.body
            const todo = await Todo.update({title, description, category}, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json(todo)
        } catch (error) {
            //console.log(error, 'error waktu di edit')
            next(500).json(error)
        }
    }

    static async delete(req,res, next) {
        try {
            let todo = await Todo.findByPk(req.params.id)

            if(todo) {
                await todo.destroy()
                await todo.save()
                res.status(200).json({msg: 'todo has been deleted'})
            }
        } catch (error) {
            //console.log(error)
            next(500).json(error)
        }
    }

    static googleLogin(req, res, next) {
        let { google_access_token } = req.body
        const client = new OAuth2Client('645674868541-6vv79eleg938e6i99t9idd1vpr0r3flj.apps.googleusercontent.com')

        let email = ''

        client.verifyIdToken({
            idToken: google_access_token,
            audience: '645674868541-6vv79eleg938e6i99t9idd1vpr0r3flj.apps.googleusercontent.com'
        })
        .then(ticket => {
            const payload = ticket.getPayload()
            email = payload.email
            return User.findOne({
                where: {email}
            })
        })
        .then(user => {
            if(user) {
                return user
            } else {
                let objUser = {
                    email,
                    password: 'random'
                }
                return User.create(objUser)
            }
        })
        .then(dataUser => {
            let token = signToken({id:dataUser.id, email:dataUser.email})
            return res.status(200).json({tokenAccess})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = Controller