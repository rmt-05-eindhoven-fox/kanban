function errorHandler(err, req, res, next){

  let status = err.status || 500
  let message = err.message || 'INTERNAL SERVER ERROR'

  if( err.name === `SequelizeValidationError` ){
    let errors = []

    err.errors.forEach(error => {
      errors.push(error.message)
    })

    status = 400
    message = errors.join(', ')

  } else if (err.name === 'JsonWebTokenError') {

    status = 400
    message = 'Credentials error'
    
  } else {

    console.log(err.name, '<<< Unhandled Error Name')

  }

  res.status(status).json({
    message
  })

}

module.exports = errorHandler