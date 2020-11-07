const { Task } = require('../models')

async function authorization(req, res, next) {
    const id  = +req.params.id
    // console.log(id, '<< auth id');
    try {
        // console.log(Task);
        const task = await Task.findByPk(id)
        // console.log(task, "<<< ini task");
        // console.log(task.UserId, "<<< UserId");
        if (!Task) {
            throw { msg: "Task is not found", status: 404 }
        } else if (+task.UserId === +req.loggedInUser.id) {
            // console.log('masuk');
            // console.log(task.UserId, "<<< UserId");
            // console.log(req.loggedInUser.id, "<<< loggedInUser");
            next()
        } else {
            throw { msg: "Not Authorized", status: 401 }
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = authorization