const { Category, User_Organization } = require('../models')
const { Op } = require("sequelize")

async function categoryAuthorization(req, res, next) {
  try {
    let option;
    if (req.params.id) {
      const option2 = {
        where: {
          id: req.params.id
        }
      }
      const category = await Category.findOne(option2)
      if (!category) {
        throw { msg: 'Category not found', status: 404 }
      } else {
        option = {
          where: {
            [Op.and]: [
              {
                UserId: req.loggedInUser.id
              }, {
                OrganizationId: category.OrganizationId
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
    } else if (user.role === 'Owner' || user.role === 'Admin') {
      next()
    } else {
      throw { msg: 'Authorization failed, you are not admin of this organization', status: 401 }
    }

  } catch (error) {
    next(error)
  }
}

module.exports = categoryAuthorization