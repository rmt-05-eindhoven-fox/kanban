const { Task } = require("../models");

class TaskController {
  static async showTask(req, res, next) {
    try {
      const tasks = await Task.findAll();
      res.status(200).json({
        tasks,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addTask(req, res, next) {
    try {
      // const email = req.body.email;
      // const password = req.body.password;
      // const payload = {
      //   email,
      //   password,
      // };
      // const user = await User.findOne({
      //   where: {
      //     email: payload.email,
      //   },
      // });
      // if (!user) {
      //   throw { message: `Invalid email/password`, status: 401 };
      // } else if (!comparePassword(payload.password, user.password)) {
      //   throw { message: `Invalid email/password`, status: 401 };
      // } else {
      //   const access_token = signToken({
      //     id: user.id,
      //     email: user.email,
      //   });
      //   res.status(200).json({ access_token });
      // }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
