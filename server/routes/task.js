const router = require("express").Router();

const TaskController = require("../controllers/task");
const { authorizationTask } = require("../middlewares/authorization");

router.get("/", TaskController.showTask);
router.post("/", TaskController.addTask);
router.patch("/:id", authorizationTask, TaskController.moveCategory);
router.delete("/:id", authorizationTask, TaskController.deleteTask);
router.put("/:id", authorizationTask, TaskController.changeTaskTitle);

module.exports = router;
