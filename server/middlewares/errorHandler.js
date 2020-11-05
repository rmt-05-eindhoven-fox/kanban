module.exports = (err, req, res, next) => {
   let status = 500
   let message = err.name ||'Internal Server Error'

   if(err.name === 'SequelizeValidationError' || err.name === 'UniqueConstraintError') {
      status = 400
      message = err.errors[0].message
   }
   res.status(status).json({error: message})
}