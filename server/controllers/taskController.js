const { Task } = require("../models/index.js")

class TaskController {

    static createTask(req, res, next){
        const { title, category } = req.body
        const UserId = req.loggedInUser.id
       
        Task.create({
            title,
            category,
            UserId 
            // coment userid jika mencoba client
        },{
            returning:true
        })
        .then(task => {
            res.status(201).json(task)
        })
        .catch(err => {
            next(err)
        })
    }


    static findAllTask(req, res, next){
        const userId = req.loggedInUser.id
        Task.findAll()
        .then( task => {
            res.status(200).json(task)
        })
        .catch(err => {
            console.log({error})
            next(err)
        })
    }

    static getTaskById(req, res, next){
        Task.findOne({
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then( task => {
            res.status(200).json(task)
        })
        .catch(err => {
            next(err)
        })
    }

    static updateTask(req, res, next){
        const { title, category} = req.body
        Task.update({
            title,
            category
        }, 
        {
            where: {
                id: +req.params.id
            },
            returning: true
        }
        )
        .then(data => {
            if(data[0] !== 1){
                throw{
                    error: `nothing to update`
                }
            }
            res.status(200).json(data[1][0])
        })
        .catch(err => {
            // res.status(500).json(err)
            next(err)
        })
    }
    static deleteTask(req, res, next){
        console.log(+req.params.id)
        Task.destroy({
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then( data => {
            res.status(200).json('Task success to delete')
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskController