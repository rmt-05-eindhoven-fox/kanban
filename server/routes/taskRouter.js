const taskRouter = require("express").Router();
const TaskController = require("../controllers/TaskController.js");
const authentication = require("../middlewares/authentication.js");
const authorization = require("../middlewares/authorization.js");

taskRouter.use(authentication);
taskRouter.get("/", TaskController.showAll);
taskRouter.post("/", TaskController.add);
// taskRouter.get("/:id", TaskController.showById); //not yet

taskRouter.put("/:id", authorization, TaskController.edit);
taskRouter.patch("/:id", authorization, TaskController.update)
taskRouter.delete("/:id", authorization, TaskController.delete);

module.exports = taskRouter;