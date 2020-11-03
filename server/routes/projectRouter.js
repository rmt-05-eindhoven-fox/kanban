const router = require('express').Router();
const ProjectController = require('../controllers/ProjectController');
const UserProjectController = require('../controllers/UserProjectController');
const { authenticationProject } = require('../middlewares/auth');

router.post('/', ProjectController.createProject);

router.get('/', ProjectController.findAll);
router.use('/:projectId', authenticationProject);
router.post('/:projectId', UserProjectController.addUser);

module.exports = router;