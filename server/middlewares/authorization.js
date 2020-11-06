const { User, Task, Category } = require("../models");

async function authorizationTask(req, res, next) {
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
    next(err);
  }
}

async function authorizationCategory(req, res, next) {
  try {
    const userId = req.User.id;
    const categoryId = req.params.id;

    const category = await Category.findByPk(categoryId);

    if (!category) {
      throw { message: `Category not found`, status: 404 };
    } else if (category.UserId !== userId) {
      throw { message: `Authorization failed`, status: 401 };
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authorizationTask,
  authorizationCategory,
};
