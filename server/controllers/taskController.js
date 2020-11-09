const {Task, User, Category} = require('../models')

class TaskController {

  static async showTasks(req, res, next) {
    try {
      // const UserId = req.loggedInUser.id
      const tasks = await Task.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [{
          model: User,
          attributes: ['username']
        }, {
          model: Category,
          attributes: ['name']
        }]
      })
      res.status(200).json(tasks)
    } catch (error) {
      next(error)
    }
  }

  static async showCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes : {
          exclude : [ 'updatedAt', 'createdAt' ]
        }
      })

      res.status(200).json(categories)

    } catch (error) {
      next(error)
    }
  }

  static async addTask(req, res) {
    const UserId = req.loggedInUser.id
    const {title, description, CategoryId} = req.body

    try {
      const newTask = await Task.create({
        title, description, CategoryId, UserId
      })
      console.log(newTask)
      const addTask = {
        id: newTask.id,
        title: newTask.title, 
        description: newTask.description,
        CategoryId: newTask.CategoryId,
        UserId
      }
      console.log(addTask)
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
      const task = await Task.findByPk(id, {
        attributes: { exclude : ['createdAt', 'updatedAt']},
        include: [{
          model: User,
          attributes: ['username', 'email']
        }, {
          model: Category,
          attributes: ['name']
        }],
        where: {
          UserId
        }
      })
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }

  static async updateTask(req, res, next) {
    const id = req.params.id
    const {description} = req.body

    try {
      const update = await Task.update({
        description, 
        // CategoryId
      }, {
        where: {id},
      returning: ['description', /*'CategoryId'*/]
      })
      res.status(200).json(update[1][0])
    } catch(error) {
      console.log(error)
      next(error)
    }
  }

  static async addCategory(req, res, next) {
    try {
      const {name} = req.body
      const newCategory = await Category.create({
        name
      })
      res.status(200).json(newCategory)
    } catch(err) {
      next(error)
    }   
  }

  static async editCategory(req, res, next) {
    const id = req.params.id
    const {CategoryId} = req.body

    try {
      const patch = await Task.update({
        CategoryId
      }, {
        where: {id},
        returning: ['CategoryId']
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

  static async deleteCategory(req, res, next) {
    try {
      const id = req.params.id
      await Category.destroy({where: {id}})
      res.status(200).json({
        message: 'Category deleted successfully'
      })
    } catch(error) {
      next(error)
    }
  }
}

module.exports = TaskController