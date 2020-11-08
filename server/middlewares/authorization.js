const { Task } = require("../models/index")

function authorization (req, res, next){
    const { id } = req.params
    // console.log(id)
    Task.findByPk(id)
    .then(data => {
        if(!data){
            throw {msg: "Task not found" , status: 404 }
        }
        else if(data.UserId === req.loggedInUser.id){
            next()
        }
        else{
            throw {msg: "Not Authorized", status: 401 }
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization