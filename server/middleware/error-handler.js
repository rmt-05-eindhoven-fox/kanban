
function errorHandler(err, req, res, next) {
  let status = err.status || 500;
  let error = { message: err.message } || { message: 'Internal Server Error' };

  if (err.name.includes('Sequelize')) {
    const errors = err.errors.map(error => {
      status = err.status || 400;
      return { message: error.message, field: error.path };
    })
    error = { status, errors }
  }
  error.status = status;
  res.status(status).json(error)
}

module.exports = errorHandler;