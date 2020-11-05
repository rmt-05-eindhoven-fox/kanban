const router = require("express").Router();
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");

router.post("/register", userController.register);
router.post("/login", userController.login);




module.exports = router;