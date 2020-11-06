const router = require('express').Router()
const ControllerUser = require('../controller/ControllerUser')
const routerCategories = require('./categories')
const routerTasks = require('./tasks')

router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/googleLogin', ControllerUser.postGoogleLogin)
router.use('/categories', routerCategories)
router.use('/tasks', routerTasks)


module.exports = router