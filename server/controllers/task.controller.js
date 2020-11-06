const { Task } = require("../models")

class TaskControl {

    static async findAll(req, res, next) {
        try {
            const id = req.loggedInUser.id
            let task = await Task.findAll({
                where: {
                    UserId: id
                }
            })
            res.status(200).json(task)
        } catch (err) {
            next(err)
        }
    }

    static async create(req, res, next) {
        try {
            const id = req.loggedInUser.id
            const { title, description} = req.body
            let task = await Task.create({
                title, description, UserId: id, CategoryId : 1
            })
            res.status(201).json(task)
        } catch (err) {
            next(err)
        }
    }


    static async findById(req, res, next) {
        try {
            const { id } = req.params
            let task = await Task.findByPk(id)
            res.status(200).json(task)
        } catch (err) {
            next(err)
        }
    }


    static async updateCategory(req, res, next) { 
        try { 
            const {id} = req.params
            let task = await Task.findByPk(id)
            const {CategoryId} = req.body
            const taskUpdate = await Task.update({CategoryId}, { 
                where : { id : req.params.id}
            })
            res.status(200).json(taskUpdate)
        } catch (err) { 
            next(err)
        }
    }


    static async updateAll(req, res, next) {
        try {

            let { title, description, CategoryId } = req.body
            let task = await Task.update({ title, description, CategoryId }, {
                where: { id: req.params.id }
            })
            res.status(200).json(task)

        } catch (err) {
            next(err)
        }
    }


    static async delete(req, res, next) {
        try {
            const { id } = req.params
            let task = await Task.destroy({
                where: { id : id }, returning : true
            })
            res.status(200).json({msg: "task success to delete"})
        } catch (err) {
            next(err)
        }
    }

}

module.exports = TaskControl