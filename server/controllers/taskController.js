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


  static async editTask(req, res, next) {
    const id = +req.params.id
    const {
      title,
      category
    } = req.body
    try {
      const newTask = await Task.update({
        title,
        category
      }, {
        where: {
          id
        },
        returning: ['id', 'title', 'category']
      })
      res.status(200).json(newTask[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async editCategory(req, res, next) {
    const id = +req.params.id
    const {
      category
    } = req.body
    try {
      const newTask = await Task.update({
        category
      }, {
        where: {
          id
        },
        returning: ['id', 'title', 'category']
      })
      console.log(newTask);
      if (newTask[0] > 0) {
        res.status(200).json(newTask[1][0])
      } else {
        res.status(404).json({
          message: 'Error task not found'
        })
      }
    } catch (error) {
      next(error)
    }
  }


  static async deleteTask(req, res, next) {
    const id = +req.params.id
    try {
      const item = await Task.destroy({
        where: {
          id
        }
      })

      if (item > 0) {
        res.status(200).json({
          message: 'Task deleted succesfully'
        })
      } else {
        res.status(404).json({
          message: 'Task not found'
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaskController