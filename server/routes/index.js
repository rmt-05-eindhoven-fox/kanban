const UserController = require('../controllers/UserController');
const TaskController = require('../controllers/TaskController');
const Authentication = require('../middlewares/Authentication');
const Authorization = require('../middlewares/Authorization')
const router = require('express').Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/googleLogin', UserController.googleLogin)

router.use(Authentication)

router.get('/tasks', TaskController.getTasks);
router.post('/tasks', TaskController.addTask);
router.delete('/tasks/:id', Authorization, TaskController.deleteTask);
router.patch('/tasks/:id', Authorization, TaskController.patchTask);
router.put('/tasks/:id', Authorization, TaskController.update);


module.exports = router;