const { Task } = require('../models/index')

function authorization(req, res, next){
    Task.findByPk(req.params.id)
    .then((dataTask) => {
        if(!dataTask) throw {msg: "Task not found"}
        else{
            console.log(dataTask.UserId, req.loggedIn)
            if(dataTask.UserId === req.loggedIn.id){
                next()
            }
            else throw {msg: "Not authorized"}
        }
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = authorization