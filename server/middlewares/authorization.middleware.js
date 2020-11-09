const {Task} = require("../models")

async function authorization(req, res, next) { 
    try { 
        let {id} = req.params; 
        const task = await Task.findByPk(id)
        if(!task) { 
            throw {name : "task not found"}
        } else if (task.UserId == req.loggedInUser.id) { 
            next ()
        } else { 
            throw {name :  "you are not authorized"}
        }
    } catch(err) { 
        next (err)
    }
}

module.exports = authorization