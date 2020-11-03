const { Task, User } = require('../models');

class TaskController {
  static async add(req, res, next) {
    const ProjectId = +req.params.projectId;
    const UserId = req.user.id;
    const { title, category, description } = req.body;

    try {
      const newTask = await Task.create({
        title,
        category,
        description,
        ProjectId,
        UserId
      });

      res.status(201).json({
        id: newTask.id,
        title: newTask.title,
        category: newTask.category,
        description: newTask.description,
        ProjectId: newTask.ProjectId,
        UserId: newTask.UserId
      });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    const ProjectId = +req.params.projectId;
    try {
      const tasks = await Task.findAll({
        where: {
          ProjectId
        },
        include: {
          model: User,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt']
          }
        }
      });

      res.status(200).json(tasks);
    } catch (err) {
      next(err);
    }
  }


  static async update(req, res, next) {
    const id = +req.params.taskId;
    const { title, category,description } = req.body;

    try {
      const updatedTask = await Task.update({
        title,
        category,
        description
      }, {
        where: {
          id
        },
        returning: true
      });

      if(updatedTask[1].length > 0) {
        res.status(200).json({
          id: updatedTask[1][0].id,
          title: updatedTask[1][0].title,
          category: updatedTask[1][0].category,
          description: updatedTask[1][0].description
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

  static async patch(req, res, next) {
    const id = +req.params.taskId;
    const { category } = req.body;

    try {
      const updatedTask = await Task.update({
        category
      }, {
        where: {
          id
        },
        returning: true
      });

      if(updatedTask[1].length > 0) {
        res.status(200).json({
          id: updatedTask[1][0].id,
          title: updatedTask[1][0].title,
          category: updatedTask[1][0].category,
          description: updatedTask[1][0].description
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