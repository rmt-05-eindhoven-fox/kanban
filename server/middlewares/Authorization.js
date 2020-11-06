const {User, Task} = require('../models/index');

async function authorization(req, res, next){
    try {
        let {id} = req.params;
        let user = await Task.findOne({where:{id}});
        if(!user){
            throw { message: "Authorization failed", status: 401};
        } else if (req.loggedIn.id == user.UserId){
            next();
        } else {
            throw { message: "Authorization failed", status: 401};
        }
    } catch (error) {
        next(error);
    }
}

module.exports = authorization;