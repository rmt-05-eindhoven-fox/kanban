module.exports = (err, req, res, next) => {
  let msg = err.msg || 'Internal server error'
  let status = err.status || 500
  res.status(status).json({msg})
}