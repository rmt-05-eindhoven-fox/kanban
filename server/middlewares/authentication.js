const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

async function authentication (req, res, next) {
    const { token } = req.headers;
    try {
        if(!token) {
            throw {msg: 'Authentication error', status: 401}
        } else {
            const decoded = verifyToken(token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if(!user) {
                throw {msg: 'User cant be found', status: 401}
            } else {
                req.loggedInUser = decoded
                next()
            }
        }  
    } catch (error) {
        console.log(error, 'authentication nya salah')
        const status = error.status || 500
        const msg = error.msg || 'Internal Server Error'
        res.status(status).json({error:msg})
    }
}

module.exports = authentication