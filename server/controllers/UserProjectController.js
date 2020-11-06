const { User, UserProject } = require('../models');

class UserProjectController { 
  static async addUser(req, res, next) {
    const ProjectId = +req.params.projectId;
    const newUserId = req.body.userId;
    console.log(newUserId);
    try {
      const userToAdd = await User.findByPk(newUserId);
      
      if(!userToAdd) {
        throw {
          name: 'NotFound'
        };
      } else {
        const junction = await UserProject.create({
          UserId: newUserId,
          ProjectId
        });
        console.log('nyampeeeeeeeee')
        res.status(201).json({
          id: junction.UserId,
          name: userToAdd.name,
          email: userToAdd.email
        });
      }

    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserProjectController;