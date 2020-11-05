const express = require("express")
const UserRouter = require("./user")
const TaskRouter = require("./task")
const authentication = require("../middlewares/authentication")
const router = express.Router()

router.use("/users", UserRouter)
router.use(authentication)
router.use("/tasks/", TaskRouter)

module.exports = router