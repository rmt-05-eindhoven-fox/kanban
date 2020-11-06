const express = require("express")
const router = express.Router()
const userRoutes = require("./user-routes")
const taskRoutes = require("./task-routes")
const organizationRoutes = require("./organization-routes")

router.use("/users", userRoutes)
router.use("/tasks", taskRoutes)
router.use("/organizations", organizationRoutes)


module.exports = router