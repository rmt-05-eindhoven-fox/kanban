const { Tag } = require('../models')

class TagController {
  static async findAll(req, res, next) {
    try {
      const option = {
        where: {
          OrganizationId: req.query.OrganizationId
        }
      }
      const tags = await Tag.findAll(option)
      res.status(200).json(tags)
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        color: req.body.color,
        OrganizationId: req.body.OrganizationId
      }
      const data = await Tag.create(payload)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async edit(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        color: req.body.color
      }
      const option = {
        where: {
          id: req.params.id
        },
        returning: true
      }
      const edited = await Tag.update(payload, option)
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
      const deleted = await Tag.destroy(option)
      res.status(200).json({
        msg: "Tag has been deleted"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TagController