const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const authentication= require('../middlewares/authentication')
const { taskAuthorization } = require('../middlewares/authorization')

router.get('/:projectId', authentication, TaskController.getAllProjectTasks)
router.post('/:projectId', authentication, taskAuthorization, TaskController.createTask)
router.delete('/:id/:projectId', authentication, taskAuthorization, TaskController.deleteTask)
router.patch('/:id/:projectId', authentication, taskAuthorization, TaskController.patchStatus)
router.put('/:id/:projectId', authentication, taskAuthorization, TaskController.editTask)

module.exports = router