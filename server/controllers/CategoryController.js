const { Category } = require("../models")

class CategoryController{
  static getCategory(req, res, next) {
    Category.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      next()
    })
  }
  static postCategory(req, res, next) {
    const data = {
      name: req.body.name
    }
    Category.create(data)
      .then(data => {
        const name = data.name
        res.status(201).json({ name })
      })
      .catch(err => {
        next(err)
      })
  }
  static deleteCategory(req, res, next) {
    Category.destroy({ where: { id: req.params.id } })
      .then(data => {
        res.status(201).json({ message: "Category success to delete" })
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = CategoryController