const { Task } = require("../models")

async function authorization(req, res, next) {
	try {
		const id = +req.params.id;
        const task = await Task.findByPk(id);
        // console.log(userId,"<<<userID")
        // console.log(loggedInUser.id,"<<<userID")
        

		if (!task) {
			throw { msg: "Invalid Authorization/Cek ID", status: 401}

		} else if (task.UserId === req.loggedInUser.id) {
			next();

		} else {
            // console.log(UserId, "<<<<<<<userId")
            
            // console.log(req.loggedInUser.id, "<<<<<<<userId")
			throw { msg: "Not Authorized", status: 401 }
		}

	} catch(err) {
        console.log(err)
		next(err);
	}
}

module.exports = authorization;