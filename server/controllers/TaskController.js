const {User, Task} = require('../models/index');

class TaskController {
    static async getTasks (req, res, next) {
        try {
            let task = await Task.findAll({include: [User], order: [['id', 'DESC']]});
            res.status(200).json(task)
        } catch (err) {
            next(err);
        }
    }

    static async addTask (req, res, next) {
        try {
            let payload = {
                title: req.body.title,
                category: req.body.category,
                description: req.body.description,
                UserId: req.loggedIn.id
            }
            let task = await Task.create(payload);
            res.status(201).json(task);
        } catch (err) {
            next(err);
        }
    }

    static async deleteTask (req, res, next) {
        try {
            let task = await Task.destroy({where: {id: req.params.id}});
            res.status(200).json(task);
        } catch (error) {
            next(error)
        }
    }

    static async patchTask (req, res, next){
        try {
            let payload = {
                category: req.body.category
            }
            let task = await Task.update(payload, {where: {id: req.params.id}});
            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }

    static async update (req, res, next){
        try {
            let payload = {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category
            }
            let task = await Task.update(payload, {where: {id: req.params.id}});
            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = TaskController