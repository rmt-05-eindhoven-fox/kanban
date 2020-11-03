const router = require('express').Router();
const TaskController = require('../controllers/TaskController');
const { authorizationTask } = require('../middlewares/auth');

router.post('/', TaskController.add);
router.use('/:taskId', authorizationTask);
router.put('/:taskId', TaskController.update);
router.patch('/:taskId', TaskController.patch);
router.delete('/:taskId', TaskController.delete);

module.exports = router;