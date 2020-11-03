const express = require("express")
const router = express.Router()
const TaskController = require("../controllers/TaskController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.use("/:id", authentication)
router.get("/:id", TaskController.readTask)
router.post("/:id", TaskController.createTask)

router.use("/:id", authorization)

router.put("/:id", TaskController.editTask)
router.patch("/:id", TaskController.changeStatus)
router.delete("/:id", TaskController.deleteTask)

module.exports = router