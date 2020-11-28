const {User} = require('../models/index');
const {verifyToken} = require('../helpers/jwt');

async function authentication (req, res, next){
    try {
        let {access_token} = req.headers;
        if(!access_token) {
            throw { message: "Authentication Failed", status: 401 };
        } else {
            let decoded = verifyToken(access_token);
            let user = await User.findOne({where: {email: decoded.email}});
            if(!user){
                throw { message: "Authentication Failed", status: 401};
            } else {
                req.loggedIn = decoded;
                next();
            } 
        }
    } catch (err) {
        next(err);
    }
}

module.exports = authentication;