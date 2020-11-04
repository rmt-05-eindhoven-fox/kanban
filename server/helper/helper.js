const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Helper {
  static hashPassword(password) {
    let salt = bcrypt.genSaltSync(+process.env.SALT);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static signToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    return token;
  }

  static verifyToken(token) {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  }
}

module.exports = Helper;
