
function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let error = { message: err.message } || { message: 'Internal Server Error' };
  error.status = status;

  if (err.name === 'SequelizeValidationError') {
    error = err.errors.map(error => {
      return { message: error.message };
    })
  }
  res.status(status).json(error)
}

module.exports = errorHandler;