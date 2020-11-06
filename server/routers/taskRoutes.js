const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

const TaskController = require('../controllers/TaskController')

router.use(authentication)

router.get('/', TaskController.getTasks)
router.post('/', TaskController.addTask)

router.put('/:id', authorization, TaskController.changeTaskDesc)
router.delete('/:id', authorization, TaskController.deleteTask)
router.patch('/:id', authorization, TaskController.changeTaskCategory)

router.get('/cat', TaskController.getCategories)
router.post('/cat', TaskController.addCategory)

router.patch('/cat/:id', TaskController.editCategory)
router.delete('/cat/:id', TaskController.deleteCategory)




module.exports = router