const { User, Todo } = require("../models");

async function authorization(req, res, next) {
  try {
    const userId = req.User.id;
    const todoId = req.params.id;

    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      throw { message: `Todo not found`, status: 404 };
    } else if (food.UserId !== userId) {
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
