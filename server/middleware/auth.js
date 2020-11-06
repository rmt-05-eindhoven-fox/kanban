const { verifyToken } = require('../helper/jwt.js');
const { User, Task } = require('../models');

async function authentication (req, res, next) {
  const { access_token } = req.headers;

  try {
    if (!access_token) {
      throw { message: 'Authentication failed', status: 401 }
    }
    else {
      const decoded = verifyToken(access_token);

      const user = await User.findOne({
        where: {
          email: decoded.email
        }
      });

      if (!user) {
        throw { message: 'Authentication failed', status: 401 }
      }
      else {
        req.loginUser = decoded;
        next();
      }
    }
  } catch (err) {
    console.log(err);
    const status = err.status || 500;
    const message = err.message || 'internal server error';

    res.status(status).json({ error: message });
  }
}

async function authorization (req, res, next) {
  const idParams = +req.params.id;

  try {
    const task = await Task.findByPk(idParams);

    if (!task) {
      throw { message: 'Task not found', status: 404 }
    }
    else if (task.UserId === req.loginUser.id) {
      next();
    }
    else {
      throw { message: 'Not Authorized', status: 401 }
    }
  } catch (err) {
    let status = err.status || 500;
    let message = err.message || 'internal server error';

    res.status(status).json(message);
  }
}

module.exports = { authentication, authorization }