async function errorHandler(err, req, res, next) {
    let status = err.status || 500
    let msg = err.message || 'Internal Server Error'

    if (err.name) {
        switch (err.name) {
            case 'SequelizeValidationError':
                let errors = []
                err.errors.forEach(error => {
                    errors.push(error.message)
                })
                status = 400
                msg = errors.join(', ')
                break;

            default:
                console.log('This type of error is unhandled')
                console.log(err.name, '<< Error name <<')
                console.log(err)
                break;
        }
    }


    res.status(status).json({ message: msg })
}

module.exports = errorHandler