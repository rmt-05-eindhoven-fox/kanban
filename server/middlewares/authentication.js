const { User } = require('../models')
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next){
    const { token } = req.headers
    try{
        if(!token){
            throw {status: 400, msg: 'You must login first!'}
        }else{
            let decoded = verifyToken(token)
            const user = await User.findOne({where:{
                email: decoded.email
            }})
            if(!user){
                throw {status: 400, msg: 'You must login first!'}
            }else{
                req.loggedInUser = decoded
                next()
            }
        }
    }
    catch(err){
        next(err)
    }    
}

module.exports = authentication