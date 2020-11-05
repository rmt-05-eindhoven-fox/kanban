const { Task, User } = require('../models')

class TaskController{
    static create(req, res, next){
        const { title, description, category } = req.body
        const id = req.loggedIn.id
        Task.create({
            title, description, category, UserId: id
        }).then((dataTask) => {
            res.status(201).json({ dataTask })
        }).catch((err) => {
            next(err)
        })
    }

    static findAll(req, res, next){
        Task.findAll({order: [["id", "asc"]], include: User})
        .then((dataTask) => {
            res.status(200).json({dataTask})
        })
        .catch((err) => {
            next(err)
        })
    }
    static findById(req, res, next){
        const id = req.params.id
        Task.findByPk(id, {include: User})
        .then((dataTask) => {
            res.status(200).json({dataTask})
        })
        .catch((err) => {
            next(err)
        })
    }
    static update(req, res, next){
        const id = req.params.id
        const { title, description, category } = req.body
        Task.update({title, description,category}, {
            where: { id:id }
        }).then((dataTask) => {
            if(!dataTask) throw {msg: "Task not found", status: 404}
            else{
                res.status(201).json({dataTask, msg: "Success update task"})
            }
        }).catch((err) => {
            next(err)
        })
    }

    static delete(req, res, next){
        const id = req.params.id
        Task.destroy({
            where: { id: id }
        }).then(dataTask => {
            if(!dataTask) throw {msg: "Todo not found", status: 404}
            else {
                res.status(200).json({msg: "Task deleted"})
            }
        }).catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController