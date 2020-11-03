const { Task } = require('../models')

function authorization(req, res, next){
    const { id } = req.params
    Task.findByPk(id)
    .then(task=>{
        if(!task){
            throw {status: 404, msg: 'Task not found'}
        }else if(task.UserId === req.loggedInUser.id){
            next()
        }else{
            throw {status: 401, msg: 'You not allowed to modify/delete this task'}
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = authorization