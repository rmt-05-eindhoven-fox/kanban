const { Kanban } = require('../models/')

async function authorization(req, res, next) {
  const id = req.params.id

  try {
    const data = await Kanban.findByPk(id)
    console.log(data.UserEmail, req.loginCredential.email)
    if (!data) {
      throw { message: 'ToDo Not Found', status: 404 }
    } else if (data.UserEmail == req.loginCredential.email) {
      next()
    } else {
      throw { message: 'Not Authorized', status: 401 }
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authorization