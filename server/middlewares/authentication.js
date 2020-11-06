const { decodingToken } = require('../helpers/jwt')
const { User } = require('../models/')

async function authentication(req, res, next) {
    const { token } = req.headers
    try{
        if(!token) {
            throw { msg: 'Authorization failed', status: 401 }
        }
        else {
            const decoded = decodingToken(token)
            console.log(decoded)
            const result = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            console.log(result)
            console.log(result.id)

            if(!result) {
                throw { msg: 'Authorization failed', status: 401 }
            }
            else {
                req.isSignedIn = decoded
                next()
            }
        }
    }
    catch(err) {
        next(err)
    }
}

module.exports = authentication