const { User } = require('../models/index.js');
const { verifyToken } = require("../helper/jwt.js");


function authentication(req, res, next){
    const { authorization } = req.headers;

    if(!authorization){
        throw {
            msg: "authentication failed"
        }
    }else {
        const decoded  = verifyToken(authorization);

        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(user => {
         
            if(!user){
                throw {msg: "user not found"}
            } else {
                req.loggedInUser = decoded
                
                next()
            }
        })
        .catch(err => {
            console.log({err})
            // const status = err.status || 500
            // const msg   = err.msg || 'internal server error'
            // res.status(status).json({error:msg})
            next(err)
        })
    }
}

module.exports = authentication 