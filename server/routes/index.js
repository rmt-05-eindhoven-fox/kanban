const router = require('express').Router()
const Controller = require('../controllers/Controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

// router.get('/', Controller.homePage)
router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/googleLogin', Controller.googleLogin)

router.use(authentication)
router.post('/create-card', Controller.createCard)
router.get('/show', Controller.showAll)
router.delete('/delete/:id', authorization, Controller.delete)
router.put('/update/:id', authorization, Controller.update)

module.exports = router