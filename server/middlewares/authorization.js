const { Task } = require('../models')

function authorization(req, res, next){
    const { id } = req.params;
    
    Task
    .findByPk(id)
    .then(data => {
        if(!data) {
            res.status(404).json({msg: 'todo not found'})
            // throw { msg: 'todo not found', status: 404 }
        } else if (data.UserId === req.loggedInUser.id) {
            next()
        } else {
            res.status(401).json({msg: 'Not authorized'})
            // throw { msg : 'Not authorized', status: 401}
        }
    })
    .catch(err => {
        const status = err.status || 500;
        const msg = err.msg || 'Internal Status Error';
        res.status(status).json({error: msg})
    })
}

module.exports = authorization;