const { Task } = require("../models")

class TaskController {
  static getTask(req, res, next) {
    Task.findAll({
      order: [["id", "ASC"]]
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next()
      })
  }
  static postTask(req, res, next) {
    const data = {
      title: req.body.title,
      description: req.body.description,
      CategoryId: req.body.CategoryId,
      userId: req.loggedInUser.id
    }
    Task.create(data)
      .then(data => {
        const title = data.title
        const category = data.category
        res.status(201).json({ title, category })
      })
      .catch(err => {
        next(err)
      })
  }
  static putTaskById(req, res, next) {
    const { title, description } = req.body

    Task.update({ title, description }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
  static patchTaskById(req, res, next) {
    const { CategoryId } = req.body

    Task.update({ CategoryId }, { where: { id: req.params.id }, returning: true })
      .then(data => {
        res.status(200).json(data[1][0])
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteTaskById(req, res, next) {
    Task.destroy({ where: { id: req.params.id } })
      .then(data => {
        res.status(201).json({ message: "Task success to delete" })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = TaskController