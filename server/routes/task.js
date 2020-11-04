const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const authetication = require('../middlewares/authentication')


router.get('/tasks', TaskController.getTask)
router.post('/tasks', authetication, TaskController.postTask)

module.exports = router