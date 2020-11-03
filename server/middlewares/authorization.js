const { Task } = require("../models/index");

async function authorization(req, res, next) {
  try {
    let id = +req.params.id;
    const task = await Task.findByPk(id);
    if (!task) {
      throw { msg: `Error not found!`, status: 404 };
    } else if (task.UserId === req.userLoggedIn.id) {
      next();
    } else {
      throw { msg: `Not authorized!`, status: 401 };
    }
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;