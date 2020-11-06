const { User_Organization } = require('../models')
const { Op } = require("sequelize");

async function memberAuthorization(req, res, next) {
  try {
    const option = {
      where: {
        [Op.and]: [
          {
            UserId: req.loggedInUser.id
          }, {
            OrganizationId: req.params.id
          }
        ]
      }
    }
    const user = await User_Organization.findOne(option)
    if (!user) {
      throw { msg: 'Organization not found or you are not authorized to see this organization', status: 401 }
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function adminAuthorization(req, res, next) {
  try {
    const option = {
      where: {
        [Op.and]: [
          {
            UserId: req.loggedInUser.id
          }, {
            OrganizationId: req.params.id
          }
        ]
      }
    }
    const user = await User_Organization.findOne(option)
    if (!user) {
      throw { msg: 'Organization not found or you are not authorized to see this organization', status: 401 }
    } else if (user.role === 'Owner' || user.role === 'Admin') {
      next()
    } else {
      throw { msg: 'Authorization failed, you are not admin of this organization', status: 401 }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  memberAuthorization,
  adminAuthorization
}