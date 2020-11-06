const app = require('express').Router()
const TaskController = require('../controllers/task')
const authentication = require('../middlewares/authentication')
const author = require('../middlewares/author')

app.use(authentication)

app.get('/', TaskController.view)

app.post('/', TaskController.add)

app.patch('/:id', author, TaskController.patch)

app.delete('/:id', author, TaskController.delete)

module.exports = app