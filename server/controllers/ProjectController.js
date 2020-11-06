const { Project, UserProject, User, Category, Task } = require('../models');

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

      const newCategories = await Category.bulkCreate([
        {
          name: 'Backlog',
          ProjectId: userProject.ProjectId
        },
        {
          name: 'Todo',
          ProjectId: userProject.ProjectId
        },
        {
          name: 'Doing',
          ProjectId: userProject.ProjectId
        },
        {
          name: 'Done',
          ProjectId: userProject.ProjectId
        }
      ]);

      res.status(201).json({
        id: newProject.id,
        name: newProject.name,
        Categories: newCategories
      });
    } catch (err) {
      next(err);
    }
  }

  static async findAll(req, res, next) {
    const UserId = req.user.id;
    try {
      const userProjects = await User.findByPk(UserId, {
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
        },
        include: {all: true, nested: true}
      });
      
      for(const project of userProjects.Projects) {
        const collaborators = await Project.findByPk(project.id, {
          include: {
            model: User,
            attributes: {
              exclude: ['password']
            }
          }
        });
        project.dataValues.Collaborators = collaborators.Users;
      }
      console.log()
      res.status(200).json(userProjects);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProjectController;