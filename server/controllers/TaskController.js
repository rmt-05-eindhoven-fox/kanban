const createError = require('http-errors');
const { Organization, Category, User, Task, UserOrganization } = require('../models');

class TaskController {

  static index(req, res, next) {

  }

  static store(req, res, next) {
    const UserId = req.logedInUser.id;
    const { name, OrganizationId, CategoryId } = req.body;
    const input = { name, OrganizationId, CategoryId, UserId }
    // res.status(200).json(input)
    Task.create(input)
      .then((task) => {
        res.status(201).json({ status: 201, task })
      }).catch((err) => {
        next(err)
      });
  }

  static show(req, res, next) {
    const { id } = req.params;
    Task.findByPk(id, {
      include: [{
        model: User,
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        // include: [{
        //   model: User,
        //   attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        // }]
      }]
    })
      .then((task) => {
        res.status(200).json({ status: 200, task });
      }).catch((err) => {
        next(err);
      });
  }

  static update(req, res, next) {

    res.status(200).json({ message: 'update connection ok' })
  }

  static patch(req, res, next) {

    res.status(200).json({ message: 'update connection ok' })
  }

  static destroy(req, res, next) {
    res.status(200).json({ message: 'destroy connection ok' })
  }

}

module.exports = TaskController;