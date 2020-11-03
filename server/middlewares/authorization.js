const { Task } = require("../models");

async function authorization(req, res, next) {
	try {
		const id = +req.params.id;
		const task = await Task.findByPk(id)

		if (!task) {
			throw { name: "NotFound" }
		
		} else if (task.userId === req.loggedInUser.id) {
			next()

		} else {
			throw { name: "NotAuthorized" }
		}
		
	} catch(err) {
		next(err)
	}
}

module.exports = authorization;