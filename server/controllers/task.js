const { Task } = require("../models");

class TaskController {
  static async showTask(req, res, next) {
    try {
      console.log(`==== Fetching Task ====`);
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
      console.log(`==== Adding Task ====`);
      const title = req.body.title;
      const CategoryId = req.body.CategoryId;
      const UserId = req.User.id;

      const payload = {
        title,
        CategoryId,
        UserId,
      };
      console.log(payload);
      const task = await Task.create(payload);
      res.status(201).json({
        task,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      console.log(`==== Deleting Task ====`);
      const TaskId = req.params.id;

      const task = await Task.destroy({
        where: {
          id: TaskId,
        },
      });

      res.status(200).json({
        task,
      });
    } catch (err) {
      next(err);
    }
  }

  static async moveCategory(req, res, next) {
    try {
      console.log(`==== Moving Task ====`);
      const TaskId = req.params.id;
      const newData = {
        CategoryId: req.body.CategoryId,
      };

      const task = await Task.update(newData, {
        where: {
          id: TaskId,
        },
      });

      if (!task) {
        throw { messsage: `Task not found`, status: 404 };
      }

      res.status(200).json({
        task,
      });
    } catch (err) {
      next(err);
    }
  }

  static async changeTaskTitle(req, res, next) {
    try {
      console.log(`==== Changing Task Title ====`);
      const newData = {
        title: req.body.title,
      };

      const task = await Task.update(newData, {
        where: {
          id: req.params.id,
        },
      });

      if (!task) {
        throw { messsage: `Task not found`, status: 404 };
      }

      res.status(200).json({
        task,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
