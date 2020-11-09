module.exports = function (err, req, res, next) {
    let status = 500
    let msg = err.name || 'Internal Server Error'
    if(err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        status = 400
        msg = err.errors[0].message
    }
    res.status(status).json({
        msg
    })
}