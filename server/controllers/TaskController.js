const { Task, User } = require('../models');

class TaskController {
  static async add(req, res, next) {
    const UserId = req.user.id;
    const CategoryId = req.user.categoryId;
    const { title, description } = req.body;

    try {
      const newTask = await Task.create({
        title,
        CategoryId,
        description,
        UserId
      });

      res.status(201).json(newTask);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    const id = +req.params.taskId;
    const { title, CategoryId, description } = req.body;

    try {
      const updatedTask = await Task.update({
        title,
        CategoryId,
        description
      }, {
        where: {
          id
        },
        returning: true
      });

      if(updatedTask[1].length > 0) {
        res.status(200).json(updatedTask[1][0]);
      } else {
        throw {
          name: 'NotFound'
        };
      }
    } catch (err) {
      next(err);
    }
  }

  static async patch(req, res, next) {
    const id = +req.params.taskId;
    const { CategoryId } = req.body;

    try {
      const updatedTask = await Task.update({
        CategoryId
      }, {
        where: {
          id
        },
        returning: true
      });

      if(updatedTask[1].length > 0) {
        res.status(200).json(updatedTask[1][0]);
      } else {
        throw {
          name: 'NotFound'
        };
      }
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    const taskId = +req.params.taskId;

    try {
      const deletedTask = await Task.destroy({
        where: {
          id: taskId
        }
      });

      if(deletedTask) {
        res.status(200).json({
          message: 'Task success to delete'
        });
      } else {
        throw {
          name: 'NotFound'
        };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;