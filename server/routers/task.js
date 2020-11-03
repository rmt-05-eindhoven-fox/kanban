const exppress = require('express')
const router = exppress.Router()
const TasksController = require('../controllers/TasksController')
const authentication = require('../middlewares/authentication')
const Authorization = require('../middlewares/authorization')

router.get('/', TasksController.list)
router.use(authentication)
router.post('/', TasksController.addTask)
router.put('/:id', TasksController.updateTask)
router.delete('/:id', TasksController.deleteTask)

module.exports = router