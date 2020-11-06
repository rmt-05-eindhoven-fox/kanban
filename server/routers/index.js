const express = require('express');
const router =  express.Router();
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const TaskController = require('../controllers/TaskController');
const UserController = require('../controllers/UserController');
// const QuoteController = require('../controllers/QuoteController');

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/googleLogin', UserController.googleLogin);

router.use(authentication);

router.get('/tasks', TaskController.listTask);
router.post('/tasks', TaskController.addTask);

// router.get('/tasks/:id', authorization, TaskController.getTaskByID);
router.put('/tasks/:id', authorization, TaskController.update);
router.delete('/tasks/:id', authorization, TaskController.delete);


module.exports = router;