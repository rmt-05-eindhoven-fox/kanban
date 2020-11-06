const { Category } = require('../models')

class CategoryController {
  static async findAll(req, res, next) {
    try {
      const option = {
        where: {
          OrganizationId: req.query.OrganizationId
        }
      }
      const categories = await Category.findAll(option)
      res.status(200).json(categories)
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      const option = {
        where: {
          OrganizationId: req.body.OrganizationId
        }
      }
      const categories = await Category.findAll(option)
      let position = categories.length + 1
      const payload = {
        name: req.body.name,
        OrganizationId: req.body.OrganizationId,
        position: position,
        type: "Custom"
      }
      const data = await Category.create(payload)
      res.status(201).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async editPosition(req, res, next) {
    try {
      const option = {
        where: {
          id: req.params.id
        },
        returning: true
      }
      const payload = {
        position: req.body.position
      }
      const updated = await Category.update(payload, option)
      res.status(200).json(updated[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async editName(req, res, next) {
    try {
      const payload = {
        name: req.body.name
      }
      const option = {
        where: {
          id: req.params.id
        },
        returning: true
      }
      const edited = await Category.update(payload, option)
      res.status(200).json(edited[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const option = {
        where: {
          id: req.params.id
        }
      }
      const deleted = await Category.destroy(option)
      res.status(200).json({
        "msg": "Category has been deleted"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = CategoryController