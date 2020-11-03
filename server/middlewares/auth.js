const { verifyToken } = require('../helpers/jwt');
const { User, UserProject, Task } = require('../models');

const authentication = async (req, res, next) => {
  const access_token = req.headers.access_token;
  const decoded = verifyToken(access_token);
  try {
    if (!access_token) {
      throw {
        name: 'AuthenticationFailed'
      };
    } else if (!decoded) {
      throw {
        name: 'AuthenticationFailed'
      };
    } else {
      const { id, email } = decoded;
      const user = await User.findByPk(id);
      if(user) {
        req.user = { id, email }; // ! COMMENT
        next();
      } else {
        throw {
          name: 'AuthenticationFailed'
        };
      }
    }
  } catch (error) {
    next(error);
  }
}

const authenticationProject = async (req, res, next) => {
  const ProjectId = +req.params.projectId;
  const UserId = req.user.id;
  try {
    const userProject = await UserProject.findOne({
      where: {
        UserId,
        ProjectId
      }
    });

    if(!userProject) {
      throw {
        name: 'AuthenticationFailed'
      };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

const authorizationTask = async (req, res, next) => {
  const taskId = +req.params.taskId;
  const userId = req.user.id;

  try {
    const userTask = await Task.findByPk(taskId);
    if (!userTask) {
      throw {
        name: 'NotFound'
      };
    } else if (userTask.UserId !== userId) {
      throw {
        name: 'AuthorizationFailed'
      };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authentication,
  authenticationProject,
  authorizationTask
}