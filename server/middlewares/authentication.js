// const { auth } = require("google-auth-library")
const { verifyToken } = require("../helpers/jwt")
const { User } = require('../models')

async function authentication(req, res, next) {
    const {token} = req.headers

    // console.log(token, "<<<<ini token dari middlewares atas")
    try{
        if(!token) {
            console.log(token, "<<<<ini token dari middlewares if")
            throw { msg: "Invalid Authentication", status:401}
        }
        else {
            const decoded = verifyToken(token)

            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            });

            if(!user) {
                throw { msg: "invalid Auhthentication", status: 401}
            } 
            else {
                req.loggedInUser = decoded;
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}


module.exports = authentication