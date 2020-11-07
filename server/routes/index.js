const router = require("express").Router()
const userController = require("../controllers/userController.js")
const taskRouter = require("../routes/task.js")

router.post('/register', userController.register);
router.post('/login', userController.login);
router.use('/tasks', taskRouter);

module.exports = router