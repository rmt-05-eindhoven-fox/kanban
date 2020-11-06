const express = require('express');
const router =  express.Router();
const authorization = require('../middlewares/authorization');

const TaskController = require('../controllers/TaskController');

router.get('/', TaskController.listTask);
router.post('/', TaskController.addTask);

// router.get('/tasks/:id', authorization, TaskController.getTaskByID);
router.put('/:id', authorization, TaskController.update);
router.delete('/:id', authorization, TaskController.delete);


module.exports = router;