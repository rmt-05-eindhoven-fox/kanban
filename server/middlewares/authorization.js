const {  Task } = require("../models");

const authorization = async (req, res, next) => {
	const { id } = req.params;

	try {
		const task = await Task.findByPk(id);
		if (task && task.UserId === req.userData.id) {
			next();
		} else {
			throw { message: `Forbidden Access`, statusCode: 403 };
		}
	} catch (err) {
		return next(err);
	}
};

module.exports = authorization