const {Task, User} = require('../models/index');

class TasksController {
    static async list(req, res, next) {
        try {
            const tasks = await Task.findAll({ order: [["updatedAt", "ASC"]], include: {model: User, attributes: {exclude: ["password"]}} });
            res.status(200).json(tasks)
        } catch (err) {
            next(err)
        }
    }
    static async addTask(req, res, next) {
        try {
            const {title, category} = req.body
            const UserId = req.loggedInUser.id
            const newTask = await Task.create({
                title,
                category,
                UserId
            })
            res.status(201).json(newTask)
        } catch (err) {
            next(err)
        }
    }
    static async updateTask(req, res, next) {
        try {
            let id = req.params.id;
            const {title, category} = req.body
            const update = await Task.update({
                title,
                category
            }, {
                where: {id},
                returning: true
            })
            if (update[0] === 0) {
                return next({
                    name: 'NotFound',
                    msg: 'Error Not Found!'
                })
            } else {
                res.status(201).json(update[1][0])
            }
        } catch (err) {
            next(err)
        }
    }
    static async deleteTask(req, res, next) {
        try {
            const id = req.params.id;
            const delTask = await Task.destroy({
                where: {id}
            })
            if (!delTask) {
                return next({
                    name: 'NotFound',
                    msg: 'Error Not Found!'
                })
            } else {
                res.status(200).json({
                    msg: 'Task Deleted Successfully'
                });
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TasksController