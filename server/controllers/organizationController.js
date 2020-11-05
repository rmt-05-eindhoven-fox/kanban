const { Organization, User_Organization, Category, Tag, User, Notification } = require('../models')
const { Op } = require("sequelize");

class OrganizationController {
  static async findAll(req, res, next) {
    try {
      const UserId = req.loggedInUser.id
      const option = {
        where: { UserId },
        include: [{
          model: Organization,
          include: [Category, Tag]
        }],
        order: [[Organization, Category, 'position', 'ASC']]
      }
      const data = await User_Organization.findAll(option)
      const organizations = data.map(el => {
        return el.Organization
      })
      res.status(200).json(organizations)
    } catch (error) {
      console.log(error)
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
      const payload3 = [
        {
          name: 'Backlog',
          type: 'Default',
          OrganizationId: newOrg.id,
          position: 1
        },
        {
          name: 'Todo',
          type: 'Default',
          OrganizationId: newOrg.id,
          position: 2
        },
        {
          name: 'Doing',
          type: 'Default',
          OrganizationId: newOrg.id,
          position: 3
        },
        {
          name: 'Done',
          type: 'Default',
          OrganizationId: newOrg.id,
          position: 4
        }
      ]
      const categories = await Category.bulkCreate(payload3)
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
        },
        returning: true
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

  static async showMember(req, res, next) {
    try {
      const option = {
        where: {
          OrganizationId: req.params.id
        },
        include: User
      }
      const data = await User_Organization.findAll(option)
      const members = data.map(el => {
        const member = {
          name: el.User.first_name + ' ' + el.User.last_name,
          email: el.User.email,
          profile_picture: el.User.profile_picture,
          role: el.role
        }
        return member
      })
      res.status(200).json(members)
    } catch (error) {
      next(error)
    }
  }

  static async invite(req, res, next) {
    try {
      const option = {
        where: {
          email: req.body.UserEmail
        }
      }
      const invitedUser = await User.findOne(option)
      const payload = {
        assigner: req.loggedInUser.email,
        type: "Invitation",
        UserId: invitedUser.id,
        OrganizationId: req.params.id
      }
      const data = Notification.create(payload)
      res.status(201).send({
        msg: `Invitation has been sent to ${invitedUser.email}, please wait until user accepted your invitation request`
      })
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async changeRole(req, res, next) {
    try {
      const payload = {
        role: req.body.role
      }
      const option = {
        where: {
          [Op.and]: [
            {
              UserId: req.params.UserId,
              OrganizationId: req.params.id
            }
          ]
        },
        returning: true
      }
      const edited = await User_Organization.update(payload, option)
      res.status(200).json(edited[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async leave(req, res, next) {
    try {
      const option = {
        where: {
          [Op.and]: [
            {
              UserId: req.params.UserId,
              OrganizationId: req.params.id
            }
          ]
        }
      }
      const deleted = await User_Organization.destroy(option)
      res.status(200).json({
        msg: "Successfully leave from organization"
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = OrganizationController