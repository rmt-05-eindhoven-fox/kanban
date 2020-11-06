
const router = require('express').Router()
const ControllerTasks = require('../controller/ControllerTasks')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


router.use(authentication)
router.post('/', ControllerTasks.addTasks)
router.get('/', ControllerTasks.getAllTasks)
//router.get('/backlog', ControllerTasks.getBackLog)
router.put('/:id', authorization, ControllerTasks.updateTask)
router.delete('/:id', authorization, ControllerTasks.deleteTask)

module.exports = router