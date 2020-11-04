const route = require('express').Router()
const controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.post('/register', controller.register)
route.post('/login', controller.login)
route.use(authentication)
route.post('/todos', controller.create)
route.get('/todos', controller.findAll)
route.put('/todos/:id', authorization, controller.edit)
route.delete('/todos/:id', authorization, controller.delete)


module.exports = route