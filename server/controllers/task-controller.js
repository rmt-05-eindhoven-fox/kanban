const { Task, User } = require('../models')

class Controller {
    static getAllTasks(req, res, next){
        Task.findAll({
            order:[['createdAt', 'DESC']],
            include:[{
                model: User,
                attributes:{exclude:['password']}
            }]
        })
        .then(data=>{
            res.status(200).json({data})
        })
        .catch(err=>{
            next(err)
        })
    }

    static postAddTask(req, res, next){
        const { title, category } = req.body
        let newTask = {
            title,
            category,
            UserId : req.loggedInUser.id
        }
        Task.create(newTask)
        .then(data=>{
            res.status(201).json({data : `You have successfully added a task with title : ${data.title}`})
        })
        .catch(err=>{
            next(err)
        })
    }

    static patchTask(req, res, next){
        const { category } = req.body
        const { id } = req.params
        let updateTask = {
            category
        }
        Task.update(updateTask, {
            where:{id},
            returning: true
        })
        .then(data=>{
            res.status(200).json({data: 'Your task successfully updated'})
        })
        .catch(err=>{
            next(err)
        })
    }

    static deleteTask(req, res, next){
        const { id } = req.params
        Task.destroy({
            where:{id}
        })
        .then(data=>{
            res.status(200).json({data: `Your task successfully deleted`})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = Controller