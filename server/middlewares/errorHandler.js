module.exports = function (err, req, res, next) {
    let status = err.status || 500
    let msg = err.msg || 'Internel Server Error'
    console.log(err.name)
    if(err.name === 'SequelizeValidationError'){
        status = 400;
        let errors = err.errors.map(x => {
            return x.message
        })
        msg = errors.join(', ')
    } else if (err.name === 'SequelizeUniqueConstraintError'){
        status = 400;
        msg = 'Email has already taken'
    } else if (err.name === 'Wrong email/password'){
        status = 401;
        msg = "Wrong email/password"
    } else {
        status = 500;
        msg = "Internal Status Error"
    }
    res.status(status).json({ msg });
}