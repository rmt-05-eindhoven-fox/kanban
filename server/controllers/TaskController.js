const { Task, Category, User} = require('../models');

class TaskController{

    static listCategory(req, res){
        Category
        .findAll()
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }

    static listTask(req, res){
        Task
        .findAll({
            include: [Category, User]
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err, "<<<<<< ERROR LIST TASK")
            res.status(400).json(err)
        })
    }

    static addTask(req, res){
        let { title, description, due_date, CategoryId } = req.body;

        const newTask = {
            title, description, due_date, CategoryId, UserId:req.loggedInUser.id
        }

        Task.create(newTask)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err, "<<<<<<< ERROR POST")
            res.status(400).json(err)
        })
    }

    static getTaskByID(req,res){
        const UserId = req.loggedInUser.id;
        const Id = req.params.id;
        
        Task.findByPk(Id, {
            where: {
                UserId
            }
        })
        .then(data => {
            res.status(202).json(data)
        })
        .catch (err => {
            res.status(400).json(err)
        })
    }

    static async update(req,res, next){
        const Id = req.params.id;
        let { title, description, due_date } = req.body;
        
        const updateTodo = {
            title, description, due_date
        }

        Task.update(updateTodo, { 
            where: { id: Id }, 
            returning: true 
        })
        .then(data => {
            res.status(200).json(data[1][0])
        })
        .catch (err => {
            res.status(400).json(err)
        })
    }

    static async delete(req, res, next){
        const Id = req.params.id;

       Task.destroy({ 
            where: 
                { id: Id }
        })
        .then(data => {
            res.status(200).json({
                message: 'Data Success To Delete'
            })
        })
        .catch (err => {
            res.status(400).json(err)
        })
    }
    
}

module.exports = TaskController;