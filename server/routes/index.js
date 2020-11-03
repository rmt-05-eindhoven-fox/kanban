const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/auth');
const loginRouter = require('./loginRouter');
const projectRouter = require('./projectRouter');
const taskRouter = require('./taskRouter')

router.post('/register', UserController.register);
router.use('/login', loginRouter);

router.use(authentication);
router.get('/users', UserController.findAll);
router.use('/projects', projectRouter);
router.use('/tasks', taskRouter);

module.exports = router;