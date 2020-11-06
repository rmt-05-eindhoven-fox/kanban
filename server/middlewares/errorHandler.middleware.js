function errorHandler(err, req, res, next) {
    
    console.log(err, "<<< ini dari error handler");
    let status = 500; 
    let message = err.name 
    console.log(message, "<<< message");
    let error;
    switch (message) {
        case "SequelizeValidationError":
            error = err.errors.map(errors => { 
                return errors.message
            }).join(", ")
            status = 400
            break;
        case "wrong email/password": 
            error = "wrong email/password", 
            status = 401
            break;
        default:
            break;
    }

    res.status(status).json({message : error})



}

module.exports = errorHandler