const createError = require('http-errors');

const { Organization, Category, User, Task, UserOrganization } = require('../models');

class OrganizationController {

  static index(req, res, next) {
    const UserId = req.logedInUser.id;
    Organization.findAll({
      where: { UserId },
    })
      .then((organizations) => {
        res.status(200).json({ status: 200, organizations });
      }).catch((err) => {
        next(err);
      });
  }

  static store(req, res, next) {
    const { name } = req.body;
    const input = { name, UserId: req.logedInUser.id };
    let organization = {};
    Organization.create(input)
      .then((data) => {
        organization = data;
        const org = { UserId: req.logedInUser.id, OrganizationId: data.id }
        return UserOrganization.create(org);
      }).then(userOrg => {
        res.status(201).json(organization);
      }).catch((err) => {
        next(err);
      });
  }

  static show(req, res, next) {
    const { id } = req.params;
    Organization.findByPk(id, {
      include: [{
        model: Category,
        include: [{
          model: Task,
          include: [{
            model: User,
            attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
          }]
        }]
      }, {
        model: User,
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      }],
      order: [
        [[Category, 'id', 'ASC']]
      ],
    })
      .then((organization) => {
        res.status(200).json({ status: 200, organization });
      }).catch((err) => {
        next(err);
      });
  }

  static update(req, res, next) {
    const { name } = req.body;
    const { id } = req.params;
    const input = { name };
    Organization.update(input, {
      where: { id },
      returning: true
    }).then((result) => {
      result = {
        status: 200,
        organization: result[1][0]
      }
      res.status(200).json(result)
    }).catch((err) => {
      next(err)
    });
  }

  static destroy(req, res, next) {
    const { id } = req.params;
    let name = '';
    Organization.findByPk(id)
      .then((result) => {
        name = result.name;
        return Organization.destroy({ where: { id }, returning: true })
      }).then((result) => {
        res.status(200).json({ status: 200, message: `Success deleted organization ${name}!` })
      }).catch((err) => {
        next(err)
      });
  }

  static getUserInfo(email) {
    User.findOne({
      where: { email }
    })
      .then((user) => {
        if (!user) {
          throw (createError(401, 'User not found!'));
        } else {
          const { id, email, fullname, password } = user;
          const data = { id, email, fullname, password };
          return data;
        }
      }).catch((err) => {
        next(err)
      });
  }

  static addMember(req, res, next) {
    const { email, OrganizationId } = req.body;
    let UserId = -1;
    let member = null;
    let input = null;
    User.findOne({
      where: { email }
    })
      .then((user) => {
        if (!user) {
          throw (createError(401, 'User not found!'));
        } else {
          const { id, email, fullname } = user;
          member = { id, email, fullname };
          UserId = id;
          input = { UserId, OrganizationId }
          return UserOrganization.findOne({
            where: {
              UserId, OrganizationId
            }
          })
        }
      }).then((result) => { 
        if (!result) {
          return UserOrganization.create(input);
        } else {
          throw (createError(400, 'User alredy exists in organization!'))
        }
      }).then(userOrganization => {
        res.status(201).json({
          status: 201,
          message: 'Successfully add new member to organization!',
          member
        })
      }).catch((err) => {
        next(err)
      });
  }

  static destroyMember(req, res, next) {
    const { id } = req.params;
    const { UserId } = req.body;
    UserOrganization.destroy({
      where: { UserId, OrganizationId: id }
    })
      .then((result) => {
        if (result > 0) {
          res.status(200).json({ status: 200, message: `Success deleted member from organization!` });
        } else {
          res.status(404).json({ status: 404, message: `Member not found in your organization!` })
        }
      }).catch((err) => {
        next(err)
      });
  }
}

module.exports = OrganizationController;