const express = require("express");
const router = express.Router();
const TaskController = require("../controller/TaskController");
const Middleware = require("../middleware/middleware");

router.use(Middleware.authentication);
router.get("/", TaskController.allTask);
router.post("/", TaskController.addTask);
router.get("/:id", Middleware.authorization, TaskController.getOneTask);
router.put("/:id", Middleware.authorization, TaskController.updateTask);
router.delete("/:id", Middleware.authorization, TaskController.deleteTask);

module.exports = router;
