module.exports = (err, req, res, next) => {
   let status = 500
   let message = err.message || 'Internal Server Error'

   if(err.name === 'SequelizeValidationError' || err.name === 'UniqueConstraintError') {
      status = 400
      message = err.message // err.errors[0].message
   } else if(err.status == 400 || err.status == 401) {
      status = err.status
      message = err.message
      // res.status(status).json(message)
   }
   // console.log(err);
   res.status(status).json(err.message)
}