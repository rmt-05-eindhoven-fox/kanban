const express = require("express")
const router = express.Router()
const TaskController = require("../controllers/TaskController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.use(authentication)
router.get("/", TaskController.getTask)
router.post("/", TaskController.postTask)
router.put("/:id", authorization, TaskController.putTaskById)
router.patch("/:id", authorization, TaskController.patchTaskById)
router.delete("/:id", authorization, TaskController.deleteTaskById)

module.exports = router