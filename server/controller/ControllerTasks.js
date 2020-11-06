const { Task, Category } = require('../models')

class ControllerTasks {
  static async addTasks(req, res, next) {
    try {
      const newTasks = {
        title: req.body.title,
        UserId: req.userActiv.id,
        CategoryId: req.body.CategoryId
      }
      const result = await Task.create(newTasks)
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  static async getBackLog(req, res, next) {
    try {
      const result = await Category.findAll({
        include: Task,
        where: {
          name: "backlog"
        }
      })
      console.log(result)
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(200).json(error)
    }
  }
  static async getAllTasks(req, res, next) {
    try {
      const result = await Task.findAll()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  static async updateTask(req, res, next) {
    try {
      const updatedTask = {
        title: req.body.title,
        CategoryId: req.body.CategoryId
      }
      const updatedId = req.params.id
      const result = await Task.update(updatedTask, {
        where: {
          id: updatedId
        }
      })
      res.status(200).json(result)
      console.log(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  static async deleteTask(req, res, next) {
    try {
      let deletedId = req.params.id
      const result = await Task.destroy({
        where: {
          id: deletedId
        }
      })
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = ControllerTasks