module.exports = (err, req, res, next) => {
  let status = ''
  let error = []
  if (err.name == 'TypeError' && err.message == `Cannot read property 'UserEmail' of null`) {
    status = 404
    error.push('Kanban Not Found')
  } else if (err.name == 'ValidationErrorItem' || err.name == 'SequelizeValidationError') {
    err.errors.forEach((el) => {
      if (el.message) {
        error.push(el.message)
      }
    })
    status = 400
  } else if (err.name == 'JsonWebTokenError') {
    status = 401
    error.push('Authentication Failed')
  } else {
    status = err.status || 500
    error.push(err.message || 'Internal Server Error')
  }
  res.status(status).json(error)
}