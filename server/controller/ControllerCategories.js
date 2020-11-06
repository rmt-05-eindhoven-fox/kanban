const { Category } = require('../models')

class ControllerCategories {
  static async addCategories(req, res, next) {
    try {
      const newCategories = { name: req.body.name }
      const result = await Category.create(newCategories)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerCategories