const { Task, User, Category } = require("../models");

class TaskController {
	static show(req, res, next) {
		//read
		Category.findAll({
			include: {
				model: Task,
				include: {
					model: User,
					where: { organization: req.userData.organization },
				},
			},
		})
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				return next(err);
			});
	}
	//create
	static add(req, res, next) {
		let params = {
			title: req.body.title,
			description: req.body.description,
			UserId: req.userData.id,
			CategoryId: +req.params.CategoryId,
		};
		Task.create(params)
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((err) => {
				console.log(err);
				return next(err);
			});
	}
	//read
	static find(req, res, next) {
		Task.findByPk(req.params.id)
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				return next(err);
			});
	}
	//update
	static edit(req, res, next) {
		let params = {
			title: req.body.title,
			description: req.body.description,
		};
		Task.update(params, {
			where: {
				id: req.params.id,
			},
			returning: true,
		})
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				console.log(err);
				return next(err);
			});
	}
	//delete
	static delete(req, res, next) {
		let options = {
			where: {
				id: req.params.id,
			},
			returning: true,
		};
		Task.destroy(options)
			.then((data) => {
				return res.status(200).json(data);
			})
			.catch((err) => {
				return next(err);
			});
	}

	static move(req, res, next) {
		let params = {
			CategoryId: req.body.CategoryId,
		};
		Task.update(params, { where: { id: req.params.id } })
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((err) => {
				return next(err);
			});
	}
}

module.exports = TaskController;
