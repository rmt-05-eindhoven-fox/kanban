const {User, Task} = require('../models/index');

class TaskController {
    static async getTasks (req, res, next) {
        try {
            let task = await Task.findAll();
            res.status(200).json(task)
        } catch (err) {
            next(err);
        }
    }
}

module.exports = TaskController