const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const authorization = require('../middlewares/authorization') 

router.post('/', TaskController.createTask)
router.get('/', TaskController.getAllTask)

// router.use(authorization)

router.get('/:id', authorization, TaskController.getTask)
router.put('/:id', authorization, TaskController.updateTask)
router.patch('/:id', authorization, TaskController.patchCategory)
router.delete('/:id', authorization, TaskController.deleteTask)

module.exports = router