module.exports = function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.message || 'internal server error';

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    if (err.errors.length > 0) {
      let errors = err.errors.map((error) => {
        return error.message;
      });
      status = 400;
      message = errors.join(', ');
    }
  }

  res.status(status).json({ message });
}