const router = require("express").Router()
const TaskController = require("../controllers/taskController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")


router.use(authentication)
router.post('/', TaskController.add)
router.get('/', TaskController.list)
router.put('/:id', authorization, TaskController.edit)
router.get('/:id', authorization, TaskController.findOne)
router.patch('/:id', authorization, TaskController.update)
router.delete('/:id', authorization, TaskController.delete)

module.exports = router