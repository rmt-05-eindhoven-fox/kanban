const { Organization, User_Organization, Category } = require('../models')

class OrganizationController {
  static async findAll(req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const option = {
        where: { UserId },
        include: Organization
      }
      const data = await User_Organization.findAll(option)
      const organizations = data.map(el => {
        return el.Organization
      })
      res.status(200).json(organizations)
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        description: req.body.description,
        UserId: req.loggedInUser.id
      }
      const newOrg = await Organization.create(payload)
      const payload2 = {
        role: 'Owner',
        UserId: req.loggedInUser.id,
        OrganizationId: newOrg.id
      }
      const newData = await User_Organization.create(payload2)
      res.status(201).json(newOrg)
    } catch (error) {
      next(error)
    }
  }

  static async edit(req, res, next) {
    try {
      const payload = {
        name: req.body.name,
        description: req.body.description
      }
      const option = {
        where: {
          id: req.params.id
        }
      }
      const edited = await Organization.update(payload, option)
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
      const deletedOrg = await Organization.destroy(option)
      res.status(200).json({
        msg: "Organization has been deleted"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OrganizationController