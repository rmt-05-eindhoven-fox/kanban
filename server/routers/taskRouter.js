const router = require('express').Router()
const TaskController = require('../controllers/taskController')

const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.get('/', TaskController.showTasks)
router.post('/', TaskController.addTask)

// router.get('/:id', authorization, TaskController.getOneTask)
router.put('/:id', authorization, TaskController.updateTask)
router.delete('/:id', authorization, TaskController.deleteTask)

router.patch('/:id', authorization, TaskController.editCategory)
router.get('/categories', TaskController.showCategories)
router.post('/categories', TaskController.addCategory)
// router.patch('/categories', TaskController.editCategory)
router.delete('/categories', TaskController.deleteCategory)

module.exports = router;