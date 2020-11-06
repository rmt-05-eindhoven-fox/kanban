const { Task, User } = require('../models/index.js');

class Controller {
    static async create (req, res, next) {
        const task = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            UserId: req.loginUser.id
        };

        try {
            const tasks = await Task.create(task);

            const data = {
                id: task.id,
                title: tasks.title,
                description: tasks.description,
                status: tasks.status,
                UserId: tasks.UserId
            }

            res.status(201).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async showAll (req, res, next) {
        try {
            const tasks = await Task.findAll({
                include: [User]
            });

            res.status(200).json(tasks);

        } catch (err) {
            console.log(err);
            next(err);           
        }
    }

    static async updateOne (req, res, next) {
        const idParams = +req.params.id;
        const task = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        }

        try {
            const tasks = await Task.update(task, {
                where: {
                    id: idParams
                },
                returning: ['id', 'title', 'description', 'status']
            });
            if (tasks[0] === 0) {
                throw { message: 'not found', status: 404 }
            }
            else {
                res.status(200).json(tasks[1][0]);
            }
        } catch (err) {
            next(err);
        }
    }

    static async updateStatus (req, res, next) {
        const idParams = +req.params.id;
        const task = {
            status: req.body.status
        }

        try {
            const tasks = await Task.update(task,
                {
                    where: {
                        id: idParams
                    },
                    returning: ['id', 'title', 'description', 'status']
                })

            if (tasks[0] === 0) {
                throw { message: 'not found', status: 404 }
            }
            else {
                res.status(200).json(tasks[1][0]);
            }
        } catch (err) {
            next(err);
        }
    }

    static async deleteOne (req, res, next) {
        let idParams = +req.params.id;

        try {
            const tasks = await Task.destroy({
                where: {
                    id: idParams
                }
            });

            if (tasks === 0) {
                throw { message: 'not found', status: 404 }
            }
            else {
                res.status(200).json({
                    message: 'todo success to delete'
                });
            }
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller;