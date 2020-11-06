const router = require('express').Router()
const TaskController = require('../controllers/taskController')
const { memberAuthorization, assigneeAuthorization } = require('../middlewares/taskAuthorization')

router.get('/', memberAuthorization, TaskController.findAll)
router.post('/', memberAuthorization, TaskController.create)

router.put('/:id', assigneeAuthorization, TaskController.edit)
router.patch('/:id', assigneeAuthorization, TaskController.updateCategory)
router.delete('/:id', assigneeAuthorization, TaskController.delete)

router.get('/:id/assignee', TaskController.showAssignee)
router.post('/:id/assignee', assigneeAuthorization, TaskController.assign)

router.post('/:id/addTag', assigneeAuthorization, TaskController.addTag)
router.delete('/:id/removeTag/:TagId', assigneeAuthorization, TaskController.removeTag)

module.exports = router