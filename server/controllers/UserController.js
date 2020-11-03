const createError = require('http-errors');
const { comparePassword } = require('../helper/bcrypt');
const { generateToken } = require('../helper/jwt');
const { User } = require('../models');

class UserController {

  static login(req, res, next) {
    const { username, password } = req.body;
    const inputPw = password;
    User.findOne({
      where: { username }
    })
      .then((user) => {
        if (!user) {
          next(createError(401, 'Wrong username / password!'));
        } else {
          const { id, username, email, fullname, password } = user;
          const match = comparePassword(inputPw, password);
          if (match) {
            const access_token = generateToken({ id, username, email, fullname })
            res.status(200).json({ fullname, access_token })
          } else {
            next(createError(401, 'Wrong username / password!'))
          }
        }
      }).catch((err) => {
        next(err);
      });
  }

  static register(req, res, next) {
    const { fullname, username, email, password } = req.body;
    const input = { fullname, username, email, password };
    User.create(input)
      .then((user) => {
        res.status(201).json({ status: 201, user })
      }).catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;