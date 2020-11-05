const { Task } = require('../models')

module.exports = async function (req, res, next) {
  // cek apakah Task milik userLoggedIn.id? 
  const taskId = +req.params.id
  const UserId = +req.userLoggedIn.id
  console.log(req.params, taskId)
  try {
    if (isNaN(taskId)) {
      throw { msg: 'task ID is not valid!', status: 400 }
    } else {
      const task = await Task.findByPk(taskId)
      if (!task) {
        throw { msg: 'task not found', status: 404 }
      } else if (task.UserId !== UserId) {
        throw { msg: 'not authorized!', status: 401 }
      } else {
        next()
      }
    }
  } catch (err) {
    // console.log(err);
    next(err)
  }
}