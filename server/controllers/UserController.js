const createError = require('http-errors');
const { comparePassword } = require('../helper/bcrypt');
const { generateToken } = require('../helper/jwt');
const { User } = require('../models');

class UserController {

  static login(req, res, next) {
    const { email, password } = req.body;
    const inputPw = password;
    User.findOne({
      where: { email }
    })
      .then((user) => {
        if (!user) {
          next(createError(401, 'Wrong email / password!'));
        } else {
          const { id, email, fullname, password } = user;
          const match = comparePassword(inputPw, password);
          if (match) {
            const access_token = generateToken({ id, email, fullname })
            res.status(200).json({ fullname, access_token })
          } else {
            next(createError(401, 'Wrong email / password!'))
          }
        }
      }).catch((err) => {
        next(err);
      });
  }

  static register(req, res, next) {
    const { fullname, email, password } = req.body;
    const input = { fullname, email, password };
    User.create(input)
      .then((user) => {
        res.status(201).json({ status: 201, user })
      }).catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;