const { Kanban } = require('../models/')

class KanbanController {

  static async findAll(req, res, next) {
    try {
      const list = await Kanban.findAll()
      res.status(200).json(list)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      UserEmail: req.loginCredential.email
    }
    try {
      const add = await Kanban.create(data)
      res.status(201).json(add)
    } catch (error) {
      next(error)
    }
  }

  static async edit(req, res, next) {
    const id = req.params.id
    const data = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      UserEmail: req.loginCredential.email
    }
    try {
      const edit = await Kanban.update(data, { where: { id, UserEmail: data.UserEmail }, returning: true })
      if (!edit) {
        throw { message: 'Kanban Not Found', status: 404 }
      }
      res.status(200).json(edit[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async deleted(req, res, next) {
    const id = req.params.id
    const UserEmail = req.loginCredential.email
    try {
      const deleted = await Kanban.destroy({ where: { id, UserEmail } })
      if (!deleted) {
        throw { message: 'Kanban Not Found', status: '404' }
      }
      res.status(200).json('Kanban Deleted Successfully')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = KanbanController