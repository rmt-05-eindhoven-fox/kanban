const { Task } = require('../models/index')

async function authorization(req, res, next) {
    const id = +req.params.id
    try {
        const dataTask = await Task.findByPk(id)
        if(!dataTask) {
            throw { name: 'Post not found'}
        } else if(dataTask.UserId === req.loggedInUser.id ) {
            next()
        } else {
            throw { name: 'Not authorized' }
        }
    } catch (error) {
        next(error)
    }
}



module.exports = authorization