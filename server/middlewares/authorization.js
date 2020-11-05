const { Task } = require("../models");

async function authorization(request, response, next) {
    try {
        const id = +request.params.id;
        const data = await Task.findByPk(id);
        if(!data) {
            throw { name: 'NotFound' }
        }else if(data.UserId === request.loggedInUser.id) {
            next();
        }else {
            throw { name: 'Unauthorized' }
        }
    }catch(error) {
        console.log(error);
        next(error);
    }
}

module.exports = authorization;