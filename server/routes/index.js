const router = require('express').Router()
const taskRouter = require('./taskRouter')
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/googleLogin', UserController.googleLogin)

router.use(authentication)

router.use('/tasks', taskRouter)

module.exports = router
