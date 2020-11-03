const { Task } = require("../models/")

async function authorization(req, res, next) {

    const id = req.params.id
    const UserId = req.isSignedIn

    try{
        const result = Task.findByPk(id)

        if(!result){
            throw {msg: 'Task Not Found', status: 401}
        } else {
            if(result.id == UserId) {
                next()
            } else {
                throw {msg: 'Not Authorized', status: 401}
            }
        }
    }
    catch(err){
        next(err)
    }
}

module.exports = authorization




