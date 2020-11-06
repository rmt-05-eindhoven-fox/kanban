const { Task } = require("../models")

function authorization(req, res, next) {
  Task.findByPk(req.params.id)
    .then(data => {
      if (!data) {
        throw { name: "Task Not Found", status: 404 }
      } else if (data.userId === req.loggedInUser.id) {
        next()
      } else {
        throw { name: "Not Authorized", status: 401 }
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = authorization