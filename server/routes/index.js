const express = require("express")
const router = express.Router()
const tasksRouter = require("./tasks")
const userRouter = require("./users")
const categoryRouter = require("./categories")

router.use("/", userRouter)
router.use("/tasks", tasksRouter)
router.use("/category", categoryRouter)

module.exports = router
