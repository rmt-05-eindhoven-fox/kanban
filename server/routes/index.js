const router = require('express').Router()
const UserController = require('../controllers/user-controller')
const TaskController = require('../controllers/task-controller')
const Authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/googleLogin', UserController.googleLogin)

router.use(Authentication)
router.post('/tasks', TaskController.postAddTask)
router.get('/tasks', TaskController.getAllTasks)
router.patch('/tasks/:id', Authorization, TaskController.patchTask)
router.delete('/tasks/:id', Authorization, TaskController.deleteTask)


module.exports = router