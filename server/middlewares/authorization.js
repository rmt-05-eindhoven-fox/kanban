const { Kanban } = require('../models/')

async function authorization(req, res, next) {
  const id = req.params.id
  try {
    const data = Kanban.findByPk(id)
    if (!data) {
      throw { message: 'ToDo Not Found', status: 404 }
    } else if (data.UserId == req.loginCredential.id) {
      next()
    } else {
      throw { message: 'Not Authorized', status: 401 }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authorization