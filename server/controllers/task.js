const { User, Task } = require("../models");

class TaskController {
  static async addTask(req, res, next) {
    const { title, description } = req.body;

    try {
      const payload = {
        title,
        description,
        CategoryId: 1,
      };

      const newTask = await Task.create(payload);
      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  }

  static async showAll(req, res, next) {
    try {
      const tasks = await Task.findAll({ include: [User] });

      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  }

  static async assignTask(req, res, next) {
    const { id } = req.params;

    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw { msg: "Task not found", status: 404 };
      } else {
        const taskUpdated = await Task.update(
          { UserId: req.loggedIn, CategoryId: 2 },
          { where: { id }, returning: true }
        );
        res.status(200).json(taskUpdated[1]);
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateTag(req, res, next) {
    const { CategoryId } = req.body;
    const { id } = req.params;

    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw { msg: "Task not found", status: 404 };
      } else {
        const taskUpdated = await Task.update(
          { CategoryId },
          { where: { id }, returning: true }
        );
        res.status(200).json(taskUpdated[1]);
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteTask(req, res, next) {
    const { id } = req.params;

    try {
      const task = await Task.findByPk(id);
      if (!task) {
        throw { msg: "Task not found", status: 404 };
      } else {
        const deletedTask = await Task.destroy({ where: { id } });
        res.status(200).json(`Delete Success`);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
