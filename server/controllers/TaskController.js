const { Task } = require("../models");

class TaskController {
	//user can see all tasks on server w/o need to be authorized first
	static async showAll(req, res, next) {
		try {
			const tasks = await Task.findAll()

			res.status(200).json(tasks)

		} catch(err) {
			next(err)
		}
	}
	
	// Add New Task
	static async add(req, res, next) {
		try {
			const userId = req.loggedInUser.id;
			const { title, category } = req.body;

			const newTask = await Task.create({
				title,
				category,
				userId
			})

			const result = {
				"id": newTask.id,
				"title": newTask.title,
				"category": newTask.category,
				"userId": newTask.userId
			}

			res.status(201).json(result);

		} catch(err) {
			next(err)
		}
	}

	// Edit Task
	static async edit(req, res, next) {
		try {
			const id = +req.params.id;
			const { title, category } = req.body;

			const editedTask = await Task.update({
				title,
				category
			}, {
				where: { id },
				returning: true
			})

			res.status(200).json(editedTask[1][0])

		} catch(err) {
			next(err)
		}
	}

	//Update Task
	static async update(req, res, next) {
		try {
			const id = +req.params.id;
			const { category } = req.body;
			const updatedTask = await Task.update({
				category
			}, {
				where: { id },
				returning: true
			})

			res.status(200).json(updatedTask[1][0]);

		} catch(err) {
			next(err)
		}
	}

	// Delete Task
	static async delete(req, res, next) {
		try {
			const id = +req.params.id;
			const deletedTask = await Task.destroy({
				where: {
					id
				},
				returning: true
			})

			res.status(200).json({msg: "Task is deleted successfully."})

		} catch(err) {
			next(err)
		}
	}
}

module.exports = TaskController;