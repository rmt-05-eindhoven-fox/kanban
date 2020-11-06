const {Task,User} = require("../models/")

class TaskController{
  static async addTask(req,res,next){
    const userId = req.loggedInUser.id
    try{
      const data = {
        title:req.body.title,
        category:req.body.category,
        tag:req.body.tag,
        UserId:userId
      }
      const task = await Task.create(data,{returning:true})
      console.log(data)
      res.status(201).json(task)
    }
    catch(error){
      next(error)
    }
  }

  static async showTask(req,res,next){
    try {
      const task = await Task.findAll({include : [User]})
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async updateTask(req,res,next){
    try {
      const id = +req.params.id
      let data = {
        title:req.body.title,
        tag:req.body.tag
      }
      const task = await Task.update(data,{where:{id},returning:true})
      res.status(200).json(task[1][0])
    } catch (error) {
      next(error)
    }
  }

  
  static async deleteTask(req,res,next){
    try {
      const id = +req.params.id
      await Task.destroy({where:{id}})
      res.status(200).json({msg:`success delete task with id ${id}`})
    } catch (error) {
      next(error)
    }
  }

  static async updateCategory(req,res,next){
    try {
      const id = +req.params.id
      const data = {
        category: req.body.category
      }
      const task = await Task.update(
        data,
        {
          where:{id},
          returning:true
        })
      res.status(200).json(task[1][0])
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaskController