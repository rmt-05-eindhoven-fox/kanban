const {Task} = require("../models")

class TaskController {
    static async getTask(req,res,next){
        try{
            const UserId = req.loggedInUser.id
            const task = await Task.findAll({
                where: {
                        UserId
                }
            })
            res.status(200).json(task)
        }
        catch (err){
            next(err)
        }
    }
    static async postTask (req,res,next){
        const UserId = req.loggedInUser.id
        const {title, category} = req.body
        try {
            const postTask = await Task.create({
                title, 
                category,
                UserId
            })
            res.status(201).json(postTask)
        }
        catch(err) {
            next(err)
        }
    }
    
    static async putTask(req,res,next){
        const {title, category} = req.body
        const id = req.params.id
        console.log(req.body);
        try {
            const putTask = await Task.update({
                title,
                category
            }, {
                where: {
                    id: id
                }
            })
            res.status(200).json(putTask)
        }
        catch(err) {
            console.log(err);
            // next(err)
        }
    }
    static async deleteTask(req,res,next){
        console.log('masuk');
        try {
            const id = req.params.id
            console.log(id, "<<< id deleteTask");
            const deleteTask = await Task.destroy({
                where: {
                    id: id
                }
            })
            res.status(200).json({
                msg: "Task success to delete"
            })
        }
        catch(err){
            next(err)
        }
    }
}

module.exports = TaskController