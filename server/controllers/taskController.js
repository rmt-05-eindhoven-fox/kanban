const { Task, Task_Tag, User, Category, Tag, Notification, Assignee } = require('../models')

class TaskController {
  static async findAll(req, res, next) {
    try {
      if (req.query.TagId) {
        const option = {
          where: {
            TagId: req.query.TagId
          },
          include: [{
            model: Task,
            include: [User, Category, {
              model: Task_Tag,
              include: [Tag]
            }, {
                model: Assignee,
                include: [User]
              }]
          }]
        }
        const data = await Task_Tag.findAll(option)
        const tasks = data.map(el => {
          const { id, title, description, due_date, updatedAt } = el.Task
          const user = {
            name: el.Task.User.first_name + ' ' + el.Task.User.last_name,
            email: el.Task.User.email,
            profile_picture: el.Task.User.profile_picture
          }
          const category = el.Task.Category.name
          const tags = el.Task.Task_Tags.map(el2 => {
            const tag = {
              id: el2.Tag.id,
              name: el2.Tag.name,
              color: el2.Tag.color
            }
            return tag
          })

          const task = {
            id, title, description, due_date, user, category, tags, updatedAt
          }
          return task
        })
        res.status(200).json(tasks)
      } else if (req.query.OrganizationId) {
        // find task in organization
        const option = {
          where: {
            OrganizationId: req.query.OrganizationId
          },
          include: [User, Category, {
            model: Task_Tag,
            include: [Tag]
          },
            {
              model: Assignee,
              include: [User]
            }]
        }
        const data = await Task.findAll(option)
        const tasks = data.map(el => {
          const { id, title, description, due_date, updatedAt } = el
          const user = {
            name: el.User.first_name + ' ' + el.User.last_name,
            email: el.User.email,
            profile_picture: el.User.profile_picture
          }
          const category = el.Category.name
          const tags = el.Task_Tags.map(el2 => {
            const tag = {
              id: el2.Tag.id,
              name: el2.Tag.name,
              color: el2.Tag.color
            }
            return tag
          })

          const task = {
            id, title, description, due_date, user, category, tags, updatedAt
          }
          return task
        })
        res.status(200).json(tasks)
      }
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      const payload = {
        title: req.body.title,
        OrganizationId: req.body.OrganizationId,
        CategoryId: req.body.CategoryId,
        OwnerId: req.loggedInUser.id,
        UserId: req.loggedInUser.id
      }
      const data = await Task.create(payload)
      res.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async edit(req, res, next) {
    try {
      const payload = {
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        UserId: req.loggedInUser.id,
        CategoryId: req.body.CategoryId
      }
      const option = {
        where: {
          id: req.params.id
        },
        returning: true
      }
      const edited = await Task.update(payload, option)
      res.status(200).json(edited[1][0])
    } catch (error) {
      next(error)
    }
  }

  static async addTag(req, res, next) {
    try {
      const payload = {
        TaskId: req.params.id,
        TagId: req.body.TagId
      }
      const tag = await Task_Tag.create(payload)
      res.status(201).json(tag)
    } catch (error) {
      next(error)
    }
  }

  static async removeTag(req, res, next) {
    try {
      const option = {
        where: {
          TaskId: req.params.id,
          TagId: req.params.TagId
        }
      }
      const deleted = await Task_Tag.destroy(option)
      res.status(200).json({
        msg: "Tag has been removed from task"
      })
    } catch (error) {
      next(error)
    }
  }

  static async updateCategory(req, res, next) {
    try {
      const payload = {
        CategoryId: req.body.CategoryId
      }
      const option = {
        where: {
          id: req.params.id
        },
        returning: true
      }
      const edited = await Task.update(payload, option)
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
      const deleted = await Task.destroy(option)
      res.status(200).json({
        msg: "Task has been deleted"
      })
    } catch (error) {
      next(error)
    }
  }

  static async showAssignee(req, res, next) {
    try {
      const option = {
        where: {
          TaskId: req.params.id
        },
        include: User
      }
      const data = await Assignee.findAll(option)
      const assignees = data.map(el => {
        const assignee = {
          name: el.User.first_name + ' ' + el.User.last_name,
          email: el.User.email,
          profile_picture: el.User.profile_picture,
        }
        return assignee
      })
      res.status(200).json(assignees)
    } catch (error) {
      next(error)
    }
  }

  static async assign(req, res, next) {
    try {
      const option = {
        where: {
          email: req.body.UserEmail
        }
      }
      const invitedUser = await User.findOne(option)
      const payload = {
        assigner: req.loggedInUser.email,
        type: "Assignment",
        UserId: invitedUser.id,
        TaskId: req.params.id
      }
      const data = Notification.create(payload)
      res.status(201).send({
        msg: `Assignment has been sent to ${invitedUser.email}, please wait until user accepted your assignment request`
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TaskController