const router = require('express').Router();
const routerUser = require("./router-user");
const routerTask = require("./router-task");

// User
router.use("/", routerUser);

// Todo
router.use("/tasks", routerTask);

module.exports = router;