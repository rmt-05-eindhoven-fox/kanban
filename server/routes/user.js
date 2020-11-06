const router = require('express').Router()
const UserController = require('../controllers/userController')

router.post('/register', UserController.postRegister)
router.post('/login', UserController.postLogin)
router.post('/login-google', UserController.postLoginGoogle)

module.exports = router