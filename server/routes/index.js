const router = require("express").Router();
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(authentication);
router.get("/task", taskController.viewAllTask);
router.post("/task", taskController.addTask);
router.delete("/task/delete/:id", authorization, taskController.delete);


module.exports = router;