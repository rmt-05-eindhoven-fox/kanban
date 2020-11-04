const router = require('express').Router();
const TaskController = require('../controllers/TaskController');
const UserController = require('../controllers/UserController');
const Authentication = require('../middlewares/Authentication');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.use(Authentication);

router.get('/tasks', TaskController.getTasks);
router.post('/tasks', TaskController.addTask);



module.exports = router;