const { Kanban } = require('../models/')

class KanbanController {

  static async findAll(req, res, next) {
    // const UserId = +req.loginCredential.id
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
      tag: req.body.tag,
      UserId: req.loginCredential.id
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
      tag: req.body.tag,
      UserId: req.loginCredential.id
    }
    try {
      const edit = await Kanban.update(data, { where: { id, UserId: data.UserId }, returning: true })
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
    const UserId = req.loginCredential.id
    try {
      const deleted = await Kanban.destroy({ where: { id, UserId } })
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