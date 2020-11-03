const router = require('express').Router();
const taskController = require('../controller/taskController.js');
const { authorization } = require('../middleware/auth.js');

router.post('/', taskController.create);
router.get('/', taskController.showAll);
router.put('/:id', authorization, taskController.updateOne);
router.patch('/:id', authorization, taskController.updateStatus);
router.delete('/:id', authorization, taskController.deleteOne);

module.exports = router;