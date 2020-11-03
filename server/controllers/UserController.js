const { User } = require('../models');
const axios = require('axios');
const { comparePassword } = require('../helpers/hash');
const { loginToken } = require('../helpers/jwt');
const { Op } = require('sequelize');

class UserController {

  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await User.create({
        name,
        email,
        password
      });

      // const createEmail = await axios({
      //   url: `https://api.mailslurp.com/createInbox?apiKey=${process.env.MAILSLURPKEY}`,
      //   method: 'post'
      // });

      // const sendEmailDeveloper = await axios({
      //   method: "POST",
      //   url: `https://api.mailslurp.com/sendEmail?apiKey=${process.env.MAILSLURPKEY}`,
      //   data: {
      //     senderId: createEmail.id,
      //     to: 'gerrysimangunsong@gmail.com',
      //     subject: "Kanban App Feedback",
      //     body: `User ${user.name} is registered on your Kanban App with email ${user.email}`
      //   }
      // });

      // const sendEmailUser = await axios({
      //   method: "POST",
      //   url: `https://api.mailslurp.com/sendEmail?apiKey=${process.env.MAILSLURPKEY}`,
      //   data: {
      //     senderId: createEmail.id,
      //     to: `${user.email}`,
      //     subject: "Kanban App",
      //     body: `Thanks ${user.name} for registering on Kanban App. Contact gerrysimangunsong@gmail.com for more information.`
      //   }
      // });

      // if(sendEmailDeveloper || sendEmailUser) {
        res.status(201).json({
          id: user.id,
          email: user.email
        });
      // } else {
      //   throw {
      //     name: 'Internal Server Error'
      //   }
      // }
    } catch (error) {
      next(error);
    }

  }
  
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      
      if (!user) {
        throw {
          name: 'InvalidUserPassword'
        }
      } else if (!comparePassword(password, user.password)) {
        throw {
          name: 'InvalidUserPassword'
        }
      } else {
        const access_token = loginToken({
          id: user.id,
          email
        });
        res.status(200).json({ access_token, name: user.name });
      }
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req, res, next) {
    const id = req.user.id;
    try {
     const users = await User.findAll({
       where: {
        id: {
          [Op.ne]: id
        }
       },
       attributes: {
         exclude: ['password']
       }
     });
     res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;