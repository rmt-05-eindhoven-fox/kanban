const router = require('express').Router()
const UserContoller = require('../controller/user-controller')

router.post('/register', UserContoller.register)
router.post('/login', UserContoller.login)

module.exports = router