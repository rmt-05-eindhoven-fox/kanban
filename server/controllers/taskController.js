const { Task } = require("../models");

class taskController{
    static async viewAllTask(request, response) {
        try {
            const data = await Task.findAll({
                where: { id }
            });
            response.status(201).json(data)
        }catch(error) {
            next(error);
        }
    }

    static async addNew() {

    }

    static async edit() {

    }

    static async delete() {

    }
}

module.exports = taskController;