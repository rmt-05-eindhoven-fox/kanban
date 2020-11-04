const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter.js");
const taskRouter = require("./taskRouter.js");

router.use("/users", userRouter);
router.use("/tasks", taskRouter);

module.exports = router;
