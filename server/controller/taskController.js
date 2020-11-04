const {Task} = require("../models/")

class TaskController{
  static async addTask(req,res,next){
    const userId = req.loggedInUser.id
    try{
      const data = {
        title:req.body.title,
        category:req.body.category,
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
      const task = await Task.findAll()
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaskController