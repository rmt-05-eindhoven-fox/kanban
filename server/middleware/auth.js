const createError = require('http-errors');
const { User, Task, Category, Organization, UserOrganization } = require('../models');
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
  const method = req.method.toLowerCase();
  const id = req.body.OrganizationId || req.params.id || req.params.OrganizationId;

  Organization.findByPk(id, { include: [User] })
    .then((organization) => {
      if (!organization) {
        next(createError(404, 'Organization ID Not Found'))
      } else {
        const isAdmin = organization.UserId == req.logedInUser.id;
        const arrTemp = organization.Users;
        const isMember = arrTemp.find(user => user.id == req.logedInUser.id);
        if (isAdmin || isMember) {
          if (source == 'tasks' && isMember && method == 'post') {
            next();
          } else if (isMember && method != 'get') {
            next(createError(401, 'Not Authorize!'))
          } else {
            next();
          }
        } else {
          next(createError(401, 'Not authorize, For members only!'));
        }
      }
    }).catch((err) => {
      next(err);
    });
}

function authorizeCategory(req, res, next) {
  const { id } = req.params;
  Category.findByPk(id)
    .then((category) => {
      if (!category) {
        next(createError(404, 'Category id not found!'));
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
  const method = req.method.toLowerCase();
  const { id } = req.params;
  const UserId = req.logedInUser.id;
  const OrganizationId = req.body.OrganizationId || req.query.organizations;

  // const input = { method, id, UserId, OrganizationId }
  // res.status(200).json(input)

  Task.findByPk(id, {
    include: [{
      model: Organization,
      include: [{
        model: User,
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      }]
    }]
  })
    .then((task) => {
      if (!task) {
        next(createError(404, 'Task id not found!'));
      } else {
        const members = task.Organization.Users;
        const isMember = members.find(user => user.id == UserId);
        const isAdmin = task.Organization.UserId == UserId;
        if (task.OrganizationId == OrganizationId && (isMember || isAdmin)) {
          switch (method) {
            case 'delete':
            case 'put':
            case 'patch':
              if (task.UserId == UserId) {
                next();
              } else {
                next(createError(401, 'Not authorize delete or update!'));
              }
              break;
            case 'get':
              next();
              break;
            default:
              next(createError(401, 'Not authorize, For Members Only!'));
              break;
          }
        } else {
          next(createError(401, 'Not authorize, For Members Only! xssasa'));
        }
      }
    }).catch((err) => {
      next(err);
    });
}

module.exports = {
  authentication, authorizeTask, authorizeOrganization, authorizeCategory
}
