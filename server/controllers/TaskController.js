const createError = require('http-errors');
const { Organization, Category, User, Task, UserOrganization } = require('../models');

class TaskController {

  static index(req, res, next) {

  }

  static store(req, res, next) {
    const UserId = req.logedInUser.id;
    const { name, description, OrganizationId, CategoryId } = req.body;
    const input = { name, description, OrganizationId, CategoryId, UserId }
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
    const { id } = req.params;
    const { name, description, CategoryId, OrganizationId } = req.body;
    const input = { name, CategoryId };

    Category.findByPk(CategoryId)
      .then((category) => {
        // res.status(200).json(category.OrganizationId == OrganizationId)
        if (category) {
          if (category.OrganizationId != OrganizationId) {
            let err = new Error('Acces Denied!\nYou try requested move task out of organization!');
            err.status = 401;
            throw err;
          } else {
          }
        } else {
          delete input.CategoryId;
        }
        return Task.update(input, {
          where: { id },
          returning: true
        })
      }).then((result) => {
        if (result == 0) {
          let err = new Error('Category Id Not Found!');
          err.status = 404;
          throw err;
        }
        res.status(200).json({ status: 200, task: result[1][0] })
      }).catch((err) => {
        next(err);
      });
  }

  static patch(req, res, next) {
    if (req.body.name) {
      delete req.body.name;
    }
    TaskController.update(req, res, next);
  }

  static destroy(req, res, next) {
    const { id } = req.params;
    Task.destroy({
      where: { id }
    })
      .then((result) => {
        res.status(200).json({ status: 200, message: `Successfully destroy task id ${id}` })
      }).catch((err) => {
        next(err);
      });
  } 
}

module.exports = TaskController;