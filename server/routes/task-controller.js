const router = require('express').Router()
const TaskController = require('../controller/task-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)

router.get('/', TaskController.getTask)
router.post('/', TaskController.postTask)

router.put('/:id',authorization, TaskController.putTask)
router.delete('/:id',authorization, TaskController.deleteTask)

module.exports = router