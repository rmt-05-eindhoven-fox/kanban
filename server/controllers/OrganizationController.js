const { Organization } = require('../models');

class OrganizationController {

  static index(req, res, next) {
    res.status(200).json({ message: 'Get Organization' })
  }

  static store(req, res, next) {
    const { name } = req.body;
    const input = { name, UserId: req.logedInUser.id };
    Organization.create(input)
      .then((organization) => {
        res.status(200).json(organization);
      }).catch((err) => {
        console.log(err)
        next(err)
      });
  }

  static update(req, res, next) {
    res.status(200).json({ message: 'Update Organization' })
  }

  static destroy(req, res, next) {
    res.status(200).json({ message: 'Delete Organization' })
  }

}

module.exports = OrganizationController;