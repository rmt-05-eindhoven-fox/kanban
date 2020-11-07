const router = require("express").Router()
const taskController = require("../controllers/taskController.js");
const authentication = require('../middlewares/authentication');
const authorization = require("../middlewares/authorized.js");

// router.use(authentication); 
// nyalakan autentisation jika mencoba server, dan sebaliknya jka mencoba client
router.post('/', taskController.createTask);
router.get('/', taskController.findAllTask);
// router.get('/', taskController.findAllTask);

router.put('/:id', authorization, taskController.updateTask);
router.delete('/:id', authorization, taskController.deleteTask);

module.exports = router