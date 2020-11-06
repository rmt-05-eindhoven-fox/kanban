const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static register(req, res){
    const obj = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(obj)
      .then(data => {
        res.status(201).json({ 'id': data.id, 'email': data.email});
      })
      .catch(err => {
        res.status(500).json({err});
      })
  }

  static login(req, res) {
    const payload = {
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({ where : {email : payload.email}})
      .then(data => {
        if(!data) {
          res.status(401).json({ msg : "wrong email/password"});
        } else if(!comparePass(payload.password, data.password)){
          res.status(401).json({ msg : "wrong email/password"});
        } else {
          const access_token = signToken({
            id: data.id,
            email: data.email
          });

          res.status(200).json({ access_token })
        }
      })
      .catch(err => {
        res.status(500).json({err});
      })
  }
}

module.exports = UserController