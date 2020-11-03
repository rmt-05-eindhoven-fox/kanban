const createError = require('http-errors');
const { User, Task, Category, Organization, CategoryOrganization } = require('../models');
const { verifyToken } = require("../helper/jwt");

function authentication(req, res, next) {
  const { accesstoken } = req.headers;
  try {
    if (!accesstoken) {
      next(createError(401, 'Authentication failed!'));
    } else {
      const decoded = verifyToken(accesstoken);
      User.findOne({
        where: { id: decoded.id }
      })
        .then((user) => {
          if (!user) {
            next(createError(401, 'Authentication failed!'));
          } else {
            req.logedInUser = decoded;
            next();
          }
        }).catch((err) => {
          next(createError(500, err.message));
        });
    }
  } catch (err) {
    next(createError(500, err.message));
  }
}

function authorizeTask(req, res, next) {
  const { id } = req.params;
  Task.findByPk(id, { include: {} }).then((todo) => {
    if (!todo) {
      next(createError(404, 'Todo ID Not Found!'));
    } else if (todo.UserId == req.logedInUser.id) {
      next();
    } else {
      next(createError(401, 'Not authorized!'));
    }
  }).catch((err) => {
    next(err);
  });
}

function authorizeOrganization(req, res, next) {

}

function authorizeCategory(req, res, next) {

}

module.exports = {
  authentication, authorizeTask, authorizeOrganization, authorizeCategory
}
