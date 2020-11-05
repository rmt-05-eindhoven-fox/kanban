const { User, Task } = require("../models");

async function authorization(req, res, next) {
  try {
    const userId = req.User.id;
    const taskId = req.params.id;

    const task = await Task.findByPk(taskId);

    if (!task) {
      throw { message: `Task not found`, status: 404 };
    } else if (task.UserId !== userId) {
      throw { message: `Authorization failed`, status: 401 };
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = authorization;
