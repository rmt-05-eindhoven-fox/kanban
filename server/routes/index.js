const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/auth');
const loginRouter = require('./loginRouter');
const projectRouter = require('./projectRouter');
const taskRouter = require('./taskRouter');
const categoryRouter = require('./categoryRouter');

router.post('/register', UserController.register);
router.use('/login', loginRouter);

router.use(authentication);
router.get('/users', UserController.findAll);
router.use('/projects', projectRouter);
router.use('/projects/:projectId/categories', categoryRouter);
router.use('/projects/:projectId/categories/:categoryId/tasks', taskRouter);

module.exports = router;