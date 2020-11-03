function errorHandler(err, req, res, next) {
    let name = err.name || '';
    let status, error;

    switch (name) {
        case 'SequelizeValidationError':
            status = 400;
            error = err.errors.map(el => el.message).join(' ');
            break;
        case 'BadRequest':
            status = 400;
            error = 'Wrong Email/Password!';
            break;
        case 'Invalid':
            status = 400;
            error = 'Invalid Email/Password!';
            break;
        case 'AuthenticationFailed':
            status = 401;
            error = 'Authentication Failed!';
            break;
        case 'NotAuthorized':
            status = 403;
            error = 'Not Authorized!';
            break;
        case 'NotFound':
            status = 404;
            error = 'Error Not Found!';
            break;
        default:
            status = 500;
            error = 'Internal Server error';
            break;
    }
    res.status(status).json({error})
}

module.exports = errorHandler;