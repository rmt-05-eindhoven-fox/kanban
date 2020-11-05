const {Task} = require('../database/models')

authorization = async (req, res, next) => {
   const {id} = req.params
   try {
      const task = await Task.findByPk(id)

      if(!task) {
         throw {
            status: 400,
            message: 'Task Not Found'
         }
      } else if(task.UserId !== req.userLogin.id) {
         throw {
            status: 401,
            message: 'Not Authorized'
         }
      } else {
         next()
      }
   } catch (err) {
      const status = err.status || 500
      const message = err.message || 'Internal Server Error'

      res.status(status).json({error: message})
   }
}

module.exports = authorization