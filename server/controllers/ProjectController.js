const { Project, UserProject, User } = require('../models');

class ProjectController {
  static async createProject(req, res, next) {
    const UserId = req.user.id;
    const name = req.body.projectName;
    try {
      const newProject = await Project.create({
        name
      });

      const userProject = await UserProject.create({
        UserId,
        ProjectId: newProject.id
      });

      res.status(201).json({
        id: newProject.id,
        name: newProject.name
      });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    const UserId = req.user.id;
    try {
      const userProjects = await User.findByPk(UserId, {
        include: Project
      });

      res.status(200).json({
        projects: userProjects.Projects
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProjectController;