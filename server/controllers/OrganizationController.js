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
    Organization.create(input)
      .then((organization) => {
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

  static addMember(req, res, next) {
    const OrganizationId = req.params.id;
    const { UserId } = req.body;
    const input = { UserId, OrganizationId };
    UserOrganization.findOne({
      where: {
        UserId, OrganizationId
      }
    }).then((result) => {
      if (!result) {
        return UserOrganization.create(input);
      } else {
        next(createError(400, 'User alredy exists in organization!'))
      }
    }).then(userOrganization => {
      return User.findByPk(UserId)
    }).then(member => {
      member = { id: member.id, fullname: member.fullname }
      res.status(201).json({ status: 201, message: 'Successfully add new member to organization!', member })
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