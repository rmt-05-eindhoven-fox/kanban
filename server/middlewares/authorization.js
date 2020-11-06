const { Task, UserTask } = require("../models")

async function authorization(req, res, next) {

    const id = +req.params.id
    const UserId = req.isSignedIn.id

    try{
        const result = await UserTask.findAll({
            where: {
                TaskId: id
            },
            include: [Task]
        })

        if(result.length == 0){
            throw {msg: 'Task Not Found', status: 401}
        } else {
            if(result[0].UserId == UserId) {
                console.log('sudah berhasil')
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




