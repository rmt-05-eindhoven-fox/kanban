const route = require('express').Router()
const controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')

route.post('/register', controller.register)
route.post('/login', controller.login)
route.use(authentication)
route.post('/todos', controller.create)
route.get('/todos', controller.findAll)


module.exports = route