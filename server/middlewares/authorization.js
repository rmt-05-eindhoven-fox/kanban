const {Task} = require('../models/index')

async function authorization(req, res, next) {
    const id = req.params.id;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return next({
                name: 'NotFound',
                msg: 'Error Not Found!'
            })
        } else if (task.UserId === req.loggedInUser.id) {
            next()
        } else {
            return next({
                name: 'NotAuthorized',
                msg: 'Not Authorized!'
            })
        }
    } catch (err) {
        return next({
            name: 'InternalServerError',
            msg: err.message
        })
    }
}

module.exports = authorization