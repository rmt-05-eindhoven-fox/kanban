const router = require("express").Router();
const taskRouter = require("./taskRouter.js");
const UserController = require("../controllers/UserController.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

router.use("/tasks", taskRouter);

module.exports = router;