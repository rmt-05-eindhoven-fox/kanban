const router = require('express').Router()
const UserController = require('../controllers/user')
const TaskController = require('../controllers/task')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use(authentication)

router.post('/tasks', TaskController.create)
router.get('/tasks', TaskController.findAll)
router.put('/tasks/:id', authorization, TaskController.update)
router.delete('/tasks/:id', authorization, TaskController.delete)

module.exports = router