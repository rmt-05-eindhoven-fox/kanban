const express = require("express");
const router = express.Router();
const TaskController = require("../controller/TaskController");
const Middleware = require("../middleware/middleware");

router.use(Middleware.authentication);
router.get("/", TaskController.allTask);
router.post("/", TaskController.addTask);

module.exports = router;
