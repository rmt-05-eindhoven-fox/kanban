const { Task } = require("../models/index")

class TaskController {
    static add (req,res, next) {
        const { title, description, progress } = req.body
        const UserId = req.loggedInUser.id
        Task.create({title, description, progress, UserId}, {returning: true})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
    static list (req,res, next) {
        const UserId = req.loggedInUser.id
        Task.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static edit (req, res, next) {
        const { title, description,  progress } = req.body
        // console.log(title, description, status, due_date)
        // console.log(req.body)
        Task.update({
            title,
            description,
            progress
        }, {
            where :{
                id: req.params.id
            }, returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            // console.log(err, "masuk ke error bro")
            next(err)
        })
    }
    static findOne(req, res, next){
        Task.findOne({where :{id: req.params.id}}, {returning: true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
    static update(req, res, next){
        const { progress } = req.body
        // console.log(req.body)
        Task.update({
            progress
        }, {
            where :{
                id: req.params.id
            }, returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static delete(req,res, next){
        Task.destroy({where:{id: req.params.id}})
        .then(() => {
            res.status(204).send("Task success to delete")
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController