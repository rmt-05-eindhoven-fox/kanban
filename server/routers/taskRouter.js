const router = require('express').Router()
const TaskController = require('../controllers/taskController')

const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/', TaskController.showTasks)
router.post('/', TaskController.addTask)

router.get('/:id', authorization, TaskController.getOneTask)
router.put('/:id', authorization, TaskController.updateTask)
router.patch('/:id', authorization, TaskController.patchTask)
router.delete('/:id', authorization, TaskController.deleteTask)

module.exports = router;