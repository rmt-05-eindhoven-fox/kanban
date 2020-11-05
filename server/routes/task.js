const router = require("express").Router();

const TaskController = require("../controllers/task");

router.get("/", TaskController.showTask);
router.post("/", TaskController.addTask);

module.exports = router;
