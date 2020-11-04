const { verifyToken } = require('../helper/jwt')
const { User } = require('../models')

async function authentication(req, res, next){
    let { token } = req.headers
    try{
        if(!token) throw {msg: "Authentication failed", status: 403}
        else{
            let decoded = verifyToken(token)
            let dataUser = await User.findOne({
                where: { email: decoded.email }
            })
            if(!dataUser) throw {msg: "Auhtentication failed", status: 403}
            else{
                req.loggedIn = decoded
                next()
            }
        }
    } catch(err){
        next(err)
    }
}

module.exports = authentication