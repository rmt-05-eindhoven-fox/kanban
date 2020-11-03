const { User, UserProject } = require('../models');

class UserProjectController { 
  static async addUser(req, res, next) {
    const ProjectId = +req.params.projectId;
    const newUserId = req.body.userId;
    // console.log('terjadiiiiiii'); 
    try {
      const junction = await UserProject.create({
        UserId: newUserId,
        ProjectId
      });

      const addedUser = await User.findByPk(junction.UserId);

      if(!addedUser) {
        throw {
          name: 'NotFound'
        };
      } else {
        res.status(201).json({
          id: addedUser.id,
          name: addedUser.name,
          email: addedUser.email
        });
      }

    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserProjectController;