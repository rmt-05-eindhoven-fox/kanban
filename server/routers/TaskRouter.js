const TaskController = require('../controllers/TaskController')
const router = require('express').Router()
const authentication = require('../middlewares/user_authentication')
const authorization = require('../middlewares/user_authorization')

router.use(authentication)
router.get('/', TaskController.getAllTask)

router.post('/', TaskController.createTask)

router.get('/:id', authorization, TaskController.getTaskById)
router.put('/:id', authorization, TaskController.editTaskById)
router.patch('/:id', authentication, TaskController.editTaskCategoryById)
router.delete('/:id', authorization, TaskController.deleteTaskById)

module.exports = router