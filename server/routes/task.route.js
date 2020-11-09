const router = require("express").Router()
const TaskController = require("../controllers/task.controller")
const authorization = require("../middlewares/authorization.middleware")

router.get("/", TaskController.findAll)
router.post("/", TaskController.create)
router.get("/:id", TaskController.findById)
router.put("/:id", TaskController.updateAll)
router.patch("/:id", TaskController.updateCategory)
router.delete("/:id", TaskController.delete)
module.exports = router