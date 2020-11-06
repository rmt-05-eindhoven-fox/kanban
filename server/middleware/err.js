function errHandler(err, req, res, next){
    let status = err.status || 500
    let msg = err.msg || 'Internal server error'
    let errors = []

    switch(err.name){
        case 'SequelizeValidationError':
            err.errors.forEach(el => {
                errors.push(el.message)
            })
            status = 400
            msg = errors.join(', ')
            break;
        default:
            errors.push(err.msg)
            status = err.status || 500
            break;
    }
    res.status(status).json({errors})
}

module.exports = errHandler