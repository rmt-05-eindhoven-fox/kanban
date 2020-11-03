const createError = require('http-errors');
const { User, Task, Category, Organization, CategoryOrganization } = require('../models');
const { verifyToken } = require("../helper/jwt");

function authentication(req, res, next) {
  const { access_token } = req.headers;
  try {
    if (!access_token) {
      next(createError(401, 'Authentication failed!'));
    } else {
      const decoded = verifyToken(access_token);
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
  const { id } = req.params;
  Organization.findByPk(id)
    .then((organization) => {
      if (!organization) {
        next(createError(404, 'Organization ID Not Found'))
      } else {
        const UserId = organization.UserId;
        if (UserId == req.logedInUser.id) {
          next();
        } else {
          next(createError(401, 'Not Authorize!'))
        }
      }
    }).catch((err) => {
      next(err);
    });
}

function authorizeCategory(req, res, next) {

}

module.exports = {
  authentication, authorizeTask, authorizeOrganization, authorizeCategory
}
