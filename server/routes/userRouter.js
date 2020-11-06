const router = require('express').Router()
const UserController = require('../controllers/userController')
const authentication = require('../middlewares/authentication')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-login', UserController.googleLogin)

router.use(authentication)
router.get('/user', UserController.loggedInUserInfo)
router.patch('/user', UserController.editUsername)
router.get("/user/:id", UserController.findOne)

module.exports = router