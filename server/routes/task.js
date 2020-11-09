const express = require("express")
const TaskController = require("../controllers/task")
const authorization = require("../middlewares/authorization")
const router = express.Router()

router.post("/", TaskController.addTask)
router.get("/", TaskController.showAll)
router.put("/:id", TaskController.assignTask)
router.patch("/:id", authorization, TaskController.updateTag)
router.delete("/:id",authorization, TaskController.deleteTask)

module.exports = router