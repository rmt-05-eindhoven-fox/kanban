const router = require('express').Router()
const taskRouter = require('./tasks')
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authentication)
router.use('/tasks', taskRouter)

module.exports = router