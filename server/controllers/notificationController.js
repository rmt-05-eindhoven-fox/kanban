const { Notification, User_Organization, Assignee, Organization, Task } = require('../models')

class NotificationController {
  static async findAll(req, res, next) {
    try {
      const option = {
        where: {
          UserId: req.loggedInUser.id
        },
        include: [Task, Organization]
      }
      const notifications = await Notification.findAll(option)
      res.status(200).json(notifications)
    } catch (error) {
      console.log(error)
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
      const deleted = await Notification.destroy(option)
      res.status(200).json({
        msg: "Notification has been deleted"
      })
    } catch (error) {
      next(error)
    }
  }

  static async accept(req, res, next) {
    try {
      const data = await Notification.findByPk(req.params.id)
      if (data.type === "Assignment") {
        const payload = {
          UserId: data.UserId,
          TaskId: data.TaskId
        }
        const newAssignee = await Assignee.create(payload)
        const option = {
          where: {
            id: req.params.id
          }
        }
        const deleted = await Notification.destroy(option)
        res.status(201).json(newAssignee)
      } else if (data.type === "Invitation") {
        const payload = {
          role: "Member",
          UserId: data.UserId,
          OrganizationId: data.OrganizationId
        }
        const newOrg = await User_Organization.create(payload)
        const option = {
          where: {
            id: req.params.id
          }
        }
        const deleted = await Notification.destroy(option)
        res.status(201).json(newOrg)
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = NotificationController