const {
  Task
} = require('../models/index')

class TaskController {
  static async getTask(req, res, next) {
    try {
      const task = await Task.findAll()
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }


  static async postTask(req, res, next) {
    const userId = +req.loggedInUser.id
    console.log(userId);
    const {
      title,
      category,
    } = req.body
    try {
      const newTask = await Task.create({
        title,
        category,
        userId
      })

      const taskResult = {
        id: newTask.id,
        title: newTask.title,
        category: newTask.category,
        userId: newTask.userId
      }
      res.status(201).json(taskResult)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaskController