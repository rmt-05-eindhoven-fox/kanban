const { Tag, User_Organization } = require('../models')
const { Op } = require("sequelize")

async function tagAuthorization(req, res, next) {
  try {
    const option2 = {
      where: {
        id: req.params.id
      }
    }
    const tag = await Tag.findOne(option2)
    if (!tag) {
      throw { msg: 'Tag not found', status: 404 }
    } else {
      const option = {
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
      const user = await User_Organization.findOne(option)
      if (!user) {
        throw {
          msg: 'Authorization failed, you are not a member of this organization', status: 401
        }
      } else if (user.role === 'Owner' || user.role === 'Admin') {
        next()
      } else {
        throw { msg: 'Authorization failed, you are not admin of this organization', status: 401 }
      }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = tagAuthorization