const Helper = require("../helper/helper");
const { User, Task } = require("../models");

class Middleware {
  static async authentication(req, res, next) {
    const { access_token } = req.headers;
    try {
      if (!access_token) throw { msg: "Authentication failed", status: 401 };
      else {
        const decoded = await Helper.verifyToken(access_token);
        const loggedUser = await User.findOne({
          where: {
            email: decoded.email,
          },
        });
        if (!loggedUser) throw { msg: "Authentication failed", status: 401 };
        else {
          req.loggedIn = decoded;
          next();
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async authorization(req, res, next) {
    const taskId = +req.params.id;

    try {
      const foundTask = await Task.findByPk(taskId);
      if (!foundTask) throw { msg: "Task not found", status: 404 };
      else if (foundTask.userId == req.loggedIn.id) next();
      else throw { msg: "Not Authorized", status: 401 };
    } catch (err) {
      next(err);
    }
  }

  static errorHandler(err, req, res, next) {
    let status = err.status || 500;
    let msg = err.msg || "Internal Server Error";

    if (
      err.name === "SequelizeValidationError" ||
      err.name === "SequelizeUniqueConstraintError"
    ) {
      status = 400;
      msg = err.errors.map((el) => el.message).join(", ");
    } else if (err.name === "Invalid Input") {
      status = 401;
      msg = "Wrong email/password";
    } else if (err.name === "Authentication failed") {
      status = 401;
      msg = "Authentication failed";
    } else if (err.name === "Not authorized") {
      status = 401;
      msg = "Not authorized";
    } else if (err.name === "Post not found") {
      status = 404;
      msg = "Post not found";
    }
    res.status(status).json({ msg });
  }
}

module.exports = Middleware;
