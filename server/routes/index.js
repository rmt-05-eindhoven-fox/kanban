const router = require("express").Router();

const UserController = require("../controllers/user");
const authentication = require("../middlewares/authentication");

const taskRouter = require("./task");
const categoryRouter = require("./category");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/loginGoogle", UserController.loginGoogle);

router.use(authentication);
router.use("/tasks", taskRouter);
router.use("/categories", categoryRouter);

module.exports = router;
