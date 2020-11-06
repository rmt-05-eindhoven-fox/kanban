const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    let current_user = verifyToken(access_token);

    const user = await User.findByPk(current_user.id);

    if (!user) {
      throw { message: `Authentication failed`, status: 401 };
    } else {
      req.User = current_user;
      next();
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = authentication;
