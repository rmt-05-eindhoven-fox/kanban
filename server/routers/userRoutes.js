const router = require('express').Router()
const UserController = require('../controllers/UserController')
// router.get('/', (req,res) => {
//   res.status(200).json({
//     message : "Hello from user router"
//   })
// })

router.post('/register', UserController.postRegisterUser)

module.exports = router