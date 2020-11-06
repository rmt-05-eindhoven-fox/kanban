const express = require("express");
const UserRouter = require("./user");
const TaskRouter = require("./task");
const CategoryRouter = require("./category");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.use("/users", UserRouter);
router.use(authentication);
router.use("/categories", CategoryRouter);
router.use("/tasks", TaskRouter);

module.exports = router;
