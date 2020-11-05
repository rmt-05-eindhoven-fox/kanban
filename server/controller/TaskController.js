const { Task } = require("../models");

class TaskController {
  static async allTask(req, res, next) {
    try {
      const foundAllTask = await Task.findAll();
      res.status(200).json({ foundAllTask });
    } catch (err) {
      next(err);
    }
  }

  static async addTask(req, res, next) {
    const { title, description, category } = req.body;
    const UserId = +req.loggedIn.id;

    try {
      await Task.create({
        title,
        description,
        category,
        UserId,
      });
      res.status(201).json({ msg: "Task is successfully created" });
    } catch (err) {
      next(err);
    }
  }

  static async getOneTask(req, res, next) {
    const taskId = +req.params.id;

    try {
      await Task.findOne({
        where: {
          id: taskId,
        },
      });
      res.status(200).json({ foundTask });
    } catch (err) {
      next(err);
    }
  }

  static async updateTask(req, res, next) {
    const { title, description, category } = req.body;
    const taskId = +req.params.id;

    try {
      await Task.update(
        { title, description, category },
        {
          where: {
            id: taskId,
          },
        }
      );
      res.status(200).json({ msg: "Task is successfully updated!" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTask(req, res, next) {
    const taskId = +req.params.id;

    try {
      await Task.destroy({ where: { id: taskId } });
      res.status(200).json({ msg: "Task is successfully deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
