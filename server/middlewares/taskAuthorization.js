const { Task, User_Organization, Tag, Assignee } = require('../models')
const { Op } = require("sequelize")

async function memberAuthorization(req, res, next) {
  try {
    let option;
    if (req.query.OrganizationId) {
      option = {
        where: {
          [Op.and]: [
            {
              UserId: req.loggedInUser.id
            }, {
              OrganizationId: req.query.OrganizationId
            }
          ]
        }
      }
    } else if (req.query.TagId) {
      const tag = await Tag.findByPk(req.query.TagId)
      if (!tag) {
        throw { msg: 'Tag not found', status: 404 }
      } else {
        option = {
          where: {
            [Op.and]: [
              {
                UserId: req.loggedInUser.id
              }, {
                OrganizationId: tag.OrganizationId
              }
            ]
          }
        }
      }
    } else {
      option = {
        where: {
          [Op.and]: [
            {
              UserId: req.loggedInUser.id
            }, {
              OrganizationId: req.body.OrganizationId
            }
          ]
        }
      }
    }
    const user = await User_Organization.findOne(option)
    if (!user) {
      throw {
        msg: 'Authorization failed, you are not a member of this organization', status: 401
      }
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function assigneeAuthorization(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.id)
    if (!task) {
      throw { msg: 'Task not found', status: 404 }
    } else if (task.OwnerId === req.loggedInUser.id) {
      next()
    } else {
      const option = {
        where: {
          [Op.and]: [
            {
              UserId: req.loggedInUser.id
            }, {
              TaskId: task.id
            }
          ]
        }
      }
      const user = await Assignee.findOne(option)
      if (!user) {
        throw {
          msg: 'Authorization failed, only task owner and assignee can edit this task', status: 401
        }
      } else {
        next()
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  memberAuthorization,
  assigneeAuthorization
}