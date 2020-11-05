module.exports = function (err, req, res, next) {
  let status = err.status || 500
  let msg = err.msg || 'internal server error'
  // return res.status(status).json(err)
  if (err.name === "JsonWebTokenError") {
    status = 401
    msg = 'token not identified!'
  } else if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    status = 400
    msg = err.errors.map(el => {
      return el.message
    }).join(', ')
  }
  // console.log(msg);
  // return res.status(status).json(err)
  res.status(status).json({msg})
}