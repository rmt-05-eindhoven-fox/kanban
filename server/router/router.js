const TaskController = require("../controller/taskController")
const UserController = require("../controller/userController")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const router = require("express").Router()

router.post("/login", UserController.login)
router.post("/register", UserController.register)

router.use(authentication)

router.post("/tasks", TaskController.addTask)
router.get("/tasks", TaskController.showTask)

router.delete("/tasks/:id", authorization, TaskController.deleteTask)
router.put("/tasks/:id", authorization, TaskController.updateTask)
router.patch("/tasks/:id", authorization, TaskController.updateCategory)

module.exports = router