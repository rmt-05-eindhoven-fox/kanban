const { Task } = require("../models");

class TaskController {
  static async allTask(req, res, next) {
    console.log("masuk");
    try {
      const foundAllTask = await Task.findAll();
      res.status(200).json({ foundAllTask });
    } catch (err) {
      console.log(err);

      next(err);
    }
  }

  static async addTask(req, res, next) {
    const { title, description, category } = req.body;
    const UserId = +req.loggedIn.id;

    try {
      const addedTask = await Task.create({
        title,
        description,
        category,
        UserId,
      });
      res.status(201).json({ msg: "Successfully created" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = TaskController;
