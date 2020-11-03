const createError = require('http-errors');
const { User, Task, Category, Organization, CategoryOrganization } = require('../models');
const { verifyToken } = require("../helper/jwt");
const { static } = require('express');

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

function authorizeOrganization(req, res, next) {
  const source = req.originalUrl.replace('/', '');
  const method = req.method;
  const id = req.params.id || req.body.OrganizationId || req.params.OrganizationId;
  Organization.findByPk(id, { include: [User] })
    .then((organization) => {
      if (!organization) {
        next(createError(404, 'Organization ID Not Found'))
      } else {
        const UserId = organization.UserId;
        const arrTemp = organization.Users;
        const member = arrTemp.find(user => user.id == req.logedInUser.id);
        console.log(member, method, source)
        console.log(source == 'tasks' && member && method == 'POST')
        if (UserId == req.logedInUser.id || member) {
          if (source == 'tasks' && member && method == 'POST') {
            next();
          } else if (member && method != 'GET') {
            next(createError(401, 'Not Authorize!'))
          } else {
            next();
          }
        } else {
          next(createError(401, 'Not Authorize!'))
        }
      }
    }).catch((err) => {
      next(err);
    });
}

function authorizeCategory(req, res, next) {
  const { id } = req.params;
  console.log(id)
  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        next(createError(404, 'Category id not found!' ));
      } else {
        const { OrganizationId } = req.body;
        if (OrganizationId != category.OrganizationId) {
          next(createError(401), 'Not authorize!');
        } else if (category.UserId != req.logedInUser.id) {
          next(createError(401), 'Not authorize!');
        } else {
          next();
        }
      }
    }).catch((err) => {
      next(err)
    });
}

function authorizeTask(req, res, next) {
  const UserId = req.logedInUser.id;
  const { name, OrganizationId, CategoryId } = req.body;
  Category.findByPk(CategoryId)
    .then((category) => {

    }).catch((err) => {

    });
}

module.exports = {
  authentication, authorizeTask, authorizeOrganization, authorizeCategory
}
