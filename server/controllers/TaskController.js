const { Task, User } = require("../models/index");

class TaskController {

  static async addNewTask(req, res, next) {
    try {
      const { title, description, category } = req.body;
      const UserId = +req.userLoggedIn.id;
      let taskObj = {
        title,
        description,
        category,
        UserId
      };
      const task = await Task.create(taskObj);
      res.status(201).json(task);
    } catch (err) {
      next(err);
    }
  }

  static async readAllTasks(req, res, next) {
    try {
      const UserId = +req.userLoggedIn.id;
      const tasks = await Task.findAll({ order: [["updatedAt", "ASC"]], include: {model: User, attributes: {exclude: ["password"]}} });
      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  }

  static async getTaskById(req, res, next) {
    try {
      let id = +req.params.id;
      const task = await Task.findByPk(id, { include: {model: User, attributes: {exclude: ["password"]}} });
      res.status(200).json(task);
    } catch (err) {
      next(err);
    }
  }

  static async updateTaskById(req, res, next) {
    try {
      let id = +req.params.id;
      const { title, description, category } = req.body;
      let taskObj = {
        title,
        description
      };
      const task = await Task.update(taskObj, { where: {id}, returning: true });
      res.status(200).json(task[1][0]);
    } catch (err) {
      next(err);
    }
  }

  static async updateCategoryTaskById(req, res, next) {
    try {
      let id = +req.params.id;
      let category = req.body.category;
      const task = await Task.update({ category: category }, { where: {id}, returning: true });
      res.status(200).json(task[1][0]);
    } catch (err) {
      next(err);
    }
  }

  static async deleteTask(req, res, next) {
    try {
      let id = +req.params.id;
      const task = await Task.destroy({ where: {id} });
      res.status(200).json({
        msg: `Successfully delete a task!`
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = TaskController;