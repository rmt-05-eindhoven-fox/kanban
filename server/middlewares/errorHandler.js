function errorHandler (err, req, res, next) {
  let status = 500;
  let msg = err.name || `Internal server error!`;

  if(err.name === "SequelizeValidationError") {
    status = 400;
    let errors = [];
    for (let i = 0; i < err.errors.length; i++) {
      errors.push(err.errors[i].message);
    }
    msg = errors.join(', ');
  } else if (err.name === "SequelizeUniqueConstraintError") {
    status = 400;
    msg = `Email is already taken!`;
  } else if (err.message === "Request failed with status code 404") {
    status = 404;
    msg = `Error not found!`;
  } else {
    status = err.status || 500;
    msg = err.msg || `Internal server error!`;
  }

  res.status(status).json({ msg });
}

module.exports = errorHandler;