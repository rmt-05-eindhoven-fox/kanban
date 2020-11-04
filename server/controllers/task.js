const { Task } = require('../models')

module.exports = class TaskController {
  static async view(req, res, next) {
    try {
      let data = await Task.findAll()
      // console.log(data)
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ msg: 'Internal Server Error'})
    }
  }
  static async add(req, res, next) {
    try {
      let UserId = req.user.id
      let { title, category } = req.body
      let data = await Task.create({ title, category, UserId })
      console.log(data);
      res.status(200).json({ msg: 'Success add new kanban'})
    } catch (error) {
      res.status(500).json({ msg: 'internal server error'})
    }
  }
  static async patch(req, res, next) {
    try {
      let id = Number(req.params.id)
      let { category } = req.body
      let result = await Task.update({ category }, { where: { id }})
      res.status(201).json({ msg: 'success edit'})
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error"})
      
    }
  }
  static async delete(req, res, next) {
    try {
      let id = Number(req.params.id)
      let result = await Task.destroy({ where: { id }, returning: true})
      console.log(result);
      res.status(201).json({ msg: 'success delete'})
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error"})
    }
  }
}