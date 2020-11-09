const router = require("express").Router()
const UserRoute = require("./user.route")
const authentication = require("../middlewares/authentication.middleware")
const TaskRoute = require("./task.route")
const CategoryRoute = require("./category.route")
router.use("/", UserRoute)


router.use(authentication)
router.use("/tasks", TaskRoute)
router.use("/categories", CategoryRoute)
module.exports = router