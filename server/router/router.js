const TaskController = require("../controller/taskController")
const UserController = require("../controller/userController")
const authentication = require("../middleware/authentication")
const router = require("express").Router()

router.post("/login", UserController.login)
router.post("/register", UserController.register)

router.use(authentication)

router.post("/task", TaskController.addTask)
module.exports = router