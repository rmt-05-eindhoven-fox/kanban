const router = require('express').Router();
const TaskController = require("../controllers//TaskController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.use(authentication);
router.post("/", TaskController.addNewTask);
router.get("/", TaskController.readAllTask);
router.get("/:id", authorization, TaskController.getTaskById);
router.put("/:id", authorization, TaskController.updateTaskById);
router.patch("/:id", authorization, TaskController.updateCategoryTaskById);
router.delete("/:id", authorization, TaskController.deleteTask);

module.exports = router;