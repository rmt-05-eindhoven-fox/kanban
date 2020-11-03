const { Organization, Category, User } = require('../models');

class OrganizationController {

  static index(req, res, next) {
    const UserId = req.logedInUser.id;
    Organization.findAll({
      where: { UserId },
      // include: [Category]
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
        console.log(err)
        next(err)
      });
  }

  static show(req, res, next) {
    const { id } = req.params;
    Organization.findByPk(id, { include: [Category] })
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
}

module.exports = OrganizationController;