const {Task} = require('../models')

// const {comparePassword} = require('../helpers/bcrypt')
// const { signToken } = require('../helpers/jwt')

class TaskController {

  static async showTasks(req, res, next) {
    try {
      // const UserId = req.loggedInUser.id
      const tasks = await Task.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        // where: {
        //   UserId
        // }
      })
      res.status(200).json(tasks)
    } catch (error) {
      next(error)
    }
  }

  static async addTask(req, res, next) {
    const UserId = req.loggedInUser.id
    const CategoryId = req.category.id
    const {title, description} = req.body

    try {
      const newTask = await Task.create({
        title, description,  UserId, CategoryId
      })
      const addTask = {
        id: newTask.id,
        title: newTask.title, 
        description: newTask.description,
        UserId,
        CategoryId
      }
      res.status(201).json(addTask)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getOneTask(req, res, next) {
    const UserId = req.loggedInUser.id
    const id = req.params.id

    try {
      const select = await Task.findByPk(id, {
        attributes: { exclude : ['createdAt', 'updatedAt']},
        where: {
          UserId
        }
      })
      res.status(200).json(select)
    } catch (error) {
      next(error)
    }
  }

  static async updateTask(req, res, next) {
    const id = req.params.id
    const {title, description, status, due_date} = req.body

    try {
      const update = await Task.update({
        title, description, status, due_date
      }, {
        where: {id},
        returning: ['id', 'title', 'description', 'status', 'due_date']
      })
      res.status(200).json(update[1][0])
    } catch(error) {
      console.log(error)
      next(error)
    }
  }

  static async patchTask(req, res, next) {
    const id = req.params.id
    const {status} = req.body

    try {
      const patch = await Task.update({
        status
      }, {
        where: {id},
        returning: ['id', 'title', 'description', 'status', 'due_date']
      }) 
      res.status(200).json(patch[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async deleteTask(req, res, next) {
    const id = req.params.id

    try {
      const deleted = await Task.destroy({
        where: {id}
      })
      res.status(200).json({
        message: 'task deleted successfully'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaskController