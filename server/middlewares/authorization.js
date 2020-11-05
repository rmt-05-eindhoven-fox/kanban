const { Task } = require("../models")

async function authorization (req, res, next) {
	const { id } = req.params
	
	try {
		const task = await Task.findByPk( id )
		
		if (!task) {
			throw { msg: 'Task not found', status: 404}
		} else if (+task.UserId === +req.loggedIn) {
			next()
		} else {
			throw { msg: 'Not authorized', status: 401}
		}
	} catch (err) {
		next(err)
	}
}

module.exports = authorization