const { Task } = require("../models/index.js")

function authorization(req, res, next){
    const id  = +req.params.id
    Task.findOne({
        where:  id
    })
    .then(data => {
        if(!data){
            throw{ message : 'post not found', status: 404}
        } else if (data.UserId === req.loggedInUser.id){
            next()
        } else {
            throw { message: 'Not Authorized', status: 401}
        }
    })
    .catch( err => {
        next(err)
    })
}

module.exports = authorization