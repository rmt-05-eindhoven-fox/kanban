const { Task, User } = require('../models')

class TaskController {
  static async createTask(req, res, next) {
    const id = +req.userLoggedIn.id
    const { title, category } = req.body
    const payload = {
      title,
      category,
      UserId: id
    }
    try {
      const task = await Task.create(payload)
      res.status(201).json({ task })
    } catch (err) {
      // console.log(err);
      next(err)
    }
  }

  static async getAllTask(req, res, next) {
    try {
      const options = {
        include: [ User ],
        order: [['id']]
      }
      const tasks = await Task.findAll(options)
      const taskList = tasks.map(el => {
        return {
          id: el.id,
          title: el.title,
          category: el.category,
          email: el.User.email,
          UserId: el.UserId,
          updatedAt: el.updatedAt.toLocaleString()
        }
      });
      res.status(200).json(taskList)
    } catch (err) {
      // console.log(err);
      res.status(500).json(err)
    }
  }  

  static async getTask(req, res, next) {
    const id = +req.params.id
    try {
      const task = await Task.findByPk(id, { include: [ User ] })
      if (!task) {
        throw { msg: 'task not found', status: 404 }
      } else {
        const selectedTask = {
          id: task.id,
          title: task.title,
          category: task.category,
          email: task.User.email,
          UserId: task.User.Id,
          updatedAt: el.updatedAt.toLocaleString()
        }
        res.status(200).json(selectedTask)
      }
    } catch (err) {
      next(err)
    }
  }

  static async updateTask(req, res, next) {
    const id = +req.params.id
    const { title, category } = req.body
    const payload = {
      title,
      category
    }
    try {
      const options = { 
        where: { id: id},
        returning: true
      }
      const task = await Task.update(payload, options)
      res.status(200).json(task[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async patchCategory(req, res, next) {
    const id = +req.params.id
    const { category } = req.body
    const payload = {
      category
    }
    try {
      const options = { 
        where: { id: id},
        returning: true
      }
      const task = await Task.update(payload, options)
      res.status(200).json(task[1][0])
    } catch (err) {
      next(err)
    }
  }

  static async deleteTask(req, res, next) {
    const id = +req.params.id
    try {
      const options = { 
        where: { id: id},
        returning: true
      }
      const task = await Task.destroy(options)
      res.status(200).json({msg: 'deleted succesfully'})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TaskController