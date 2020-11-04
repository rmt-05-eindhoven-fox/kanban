const router = require('express').Router();
const TaskController = require('../controllers/TaskController');
const UserController = require('../controllers/UserController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);

router.get('/tasks', TaskController.getTasks);


module.exports = router;