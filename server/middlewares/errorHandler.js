module.exports = function(err, req, res, next) {
  console.log('>>>> masuk error handler <<<<<')

  let status = err.status || 500
  let msg = err.name || err.msg || 'Internal server error'
  console.log(err.name)
  
  if (err.name === 'SequelizeValidationError') {
    console.log('*** SequelizeValidationError ***')

    status = 400
    msg = err.errors.map( el => el.message).join(' <br/> ')
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    console.log('*** SequelizeUniqueConstraintError ***')
    
    status = 400
    msg = err.errors.map(el => el.message )
  } else if (err.name === 'JsonWebTokenError') {
    console.log('*** JsonWebTokenError ***')

    status = 401
    msg = 'Unauthorized/authentication failed'
  }

  res.status(status).json(msg)
}