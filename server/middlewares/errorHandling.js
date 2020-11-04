module.exports = (err, req, res, next) => {
  let status, error
  if (err.name == 'ValidationErrorItem' || err.name == 'SequelizeValidationError') {
    err.errors.forEach((el, i) => {
      if (el.message) {
        error += el.message
      }
      if (i != err.errors.length - 1) {
        error += ', '
      }
    })
    status = 400
  } else if (err.name == 'JsonWebTokenError') {
    status = 401
    error = 'Authentication Failed'
  } else {
    status = err.status || 500
    error = err.message || 'Internal Server Error'
  }
  res.status(status).json({ error })
}