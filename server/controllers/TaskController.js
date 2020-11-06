const { Category, User, Task } = require('../models/')

class TaskController {

  static async getTasks(req,res,next) {
    try {
      const tasks = await Task.findAll({
        attributes : {
          exclude : [ 'updatedAt', 'createdAt' ]
        },
        order : [ [ 'updatedAt', 'ASC' ] ]
        ,
        include : [
          { model : User,
            attributes : ['name']
            }
        ]
      })

      res.status(200).json(tasks)

    } catch (error) {
      next(error)
    }
  }

  static async getCategories(req, res, next) {
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

  static async addTask(req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const { description, CategoryId } = req.body

      const newTask = await Task.create({
        description, UserId, CategoryId
      })

      res.status(200).json({
        message : 'Task successfully added'
      })
      
    } catch (error) {
      next(error)
    }
  }

  static async changeTaskDesc(req, res, next) {
    try {
      const taskId = +req.params.id
      const {description} = req.body
      
      const updatedTask = await Task.update({ description }, { where : { id:taskId }})

      if(updatedTask[0] > 0){
        res.status(200).json({ message : `Task updated`})

      } else {
        next({
          status : 500,
          message : `Task failed to update`
        })
      }

    } catch (error) {
      next(error)
    }
  }

  static async changeTaskCategory(req, res, next) {
    try {
      const id = +req.params.id
      const { CategoryId } = req.body

      const newTask = await Task.update({ CategoryId }, {where : { id }})

      if(newTask[0] > 0){
        res.status(200).json({
          message : 'Task successfully updated'
        })

      } else {
        next({
          status : 404,
          message : `Cannot update Task`
        })
      }


    } catch (error) {
      next(error)
    }
  }

  static async deleteTask(req, res, next) {
    try {

      const id = req.params.id
      
      await Task.destroy({ where : { id }})
      res.status(200).json({ message : 'Task deleted'})
      
    } catch (error) {
      next(error)
    }
  }

  static async addCategory(req, res, next) {
    try {

      const { name } = req.body

      const newCategory = await Category.create({
        name
      })

      res.status(200).json({
        message : 'Task successfully added'
      })
      
    } catch (error) {
      next(error)
    }
  }

  static async editCategory(req, res, next) {
    try {
      
      const id = +req.params.id
      const { name } = req.body

      const updatedCategory = await Category.update({ name }, { where : { id }})

      if(updatedCategory[0] > 0){
        res.status(200).json({ message : `Category renamed successfully`})
      
      } else {

        next({
          status : 400,
          message : `Category rename failed`
        })

      }

    } catch (error) {
      next(error)
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const id = +req.params.id

      await Category.destroy({ where : { id }})

      res.status(200).json({ message : `Category deleted` })
    } catch (error) {
      next(error)
    }
  }

  
}

module.exports = TaskController