const { decodingToken } = require('../helpers/jwt')
const { User } = require()

async function authentication(req, res, next) {
    const { token } = req.headers
    try{
        if(!token) {
            throw { msg: 'Authorization failed', status: 401 }
        }
        else {
            const decoded = decodingToken(token)

            const result = User.findOne({
                where: {
                    email
                }
            })

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