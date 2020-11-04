const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const authetication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/tasks', TaskController.getTask)
router.post('/tasks', authetication, TaskController.postTask)
router.put('/tasks/:id', authetication, authorization, TaskController.editTask)
router.patch('/tasks/:id', authetication, authorization, TaskController.editCategory)
router.delete('/tasks/:id', authetication, authorization, TaskController.deleteTask)

module.exports = router