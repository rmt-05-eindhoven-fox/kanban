const router = require('express').Router();
const TaskController = require('../controllers/TaskController');
const { authorizationTask, authenticationProject } = require('../middlewares/auth');

router.use('/:projectId', authenticationProject);
router.get('/:projectId', TaskController.findAll);
router.post('/:projectId', TaskController.add);
router.use('/:projectId/:taskId', authorizationTask);
router.put('/:projectId/:taskId', TaskController.update);
router.patch('/:projectId/:taskId', TaskController.patch);
router.delete('/:projectId/:taskId', TaskController.delete);

module.exports = router;