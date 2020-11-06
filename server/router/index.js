const route = require('express').Router()
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')
const UserController = require('../controllers/user')
const KanbanController = require('../controllers/kanban')

route.get('/', (req, res) => {
  res.send('masuk')
})
route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/googleLogin', UserController.googleLogin)
route.use(authentication)
route.get('/kanban', KanbanController.findAll)
route.post('/kanban', KanbanController.add)
route.put('/kanban/:id', authorization, KanbanController.edit)
route.delete('/kanban/:id', authorization, KanbanController.deleted)

module.exports = route