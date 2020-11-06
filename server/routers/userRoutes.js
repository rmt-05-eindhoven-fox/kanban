const router = require('express').Router()
const UserController = require('../controllers/UserController')

router.post('/register', UserController.postRegisterUser)
router.post('/login', UserController.postLoginUser)
router.post('/login-google', UserController.postLoginGoogle)


module.exports = router