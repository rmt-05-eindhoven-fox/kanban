const { User, Task } = require('../models/index')


class TaskController {
    static async taskAdd(req, res, next) {
        try {
            const inputTask = {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                UserId: req.loggedInUser.id
            }
            const newTask = await Task.create(inputTask)

            res.status(201).json(newTask)
        } catch (err) {
            next(err)
        }
    }
    static async taskList(req, res, next) {
        try {
            const taskList = await Task.findAll({order: [['createdAt', 'ASC']], include: [User]})

            res.status(200).json(taskList)
        } catch (error) {
            next(error)
        }
    }
    static async taskId(req, res, next) {
        try {
            const id = +req.params.id
            const taskId = await Task.findByPk(id)

            if(taskId) {
                res.status(200).json(taskId)
            } else {
                throw { name: 'Not Found'}
            }
            
        } catch (error) {
            next(error)
        }
    }
    static async taskPut(req, res, next) {
        try {
            const id = +req.params.id
            const dataTask = {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category
            }

            const updateTask = await Task.update(dataTask, {where: {id: id}, returning: true} )

            if(updateTask[1][0]) {
                res.status(200).json(updateTask[1][0]) 
            } else {
                throw { name: 'Not Found'}
            }
            
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const id = +req.params.id

            const deleteTask = await Task.destroy( {where: {id: id}} )

            if(deleteTask) {
                res.status(200).json({ message: 'Task success to delete' }) 
            } else {
                throw { name: 'Not Found'}
            }
            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TaskController