const router = require('express').Router()
const Controller = require('../controllers/taskController')
const authorization = require('../middlewares/authorization')

router.post('/', Controller.taskAdd)

router.get('/', Controller.taskList)

router.get('/:id', authorization, Controller.taskId)

router.put('/:id', authorization, Controller.taskPut)

router.delete('/:id', authorization, Controller.delete)


module.exports = router