const { Task } = require('../models')

async function authorization(req, res, next) {
  try {

    const id = +req.params.id
    const userId = req.loggedInUser.id

    const task = await Task.findByPk(id)

    if(!task){
      next({
        status : 404,
        message : `Task not found`
      })
    
    } else {

      if(task.UserId === userId){
        next()
      
      } else {
        next({
          status : 401,
          message : `Unauthorized`
        })

      }

    }

  } catch (error) {
    next(error)
  }

  


}

module.exports = authorization