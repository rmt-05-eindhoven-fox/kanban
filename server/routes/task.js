const TaskController = require('../controllers.js/taskController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

router.use(authentication)
router.get('/', TaskController.findAll);
router.post('/', TaskController.create);
router.get('/:id', authorization, TaskController.findId);
router.put('/:id', authorization, TaskController.update);
router.patch('/:id', authorization, TaskController.updateCat);
router.delete('/:id', authorization, TaskController.delete);

module.exports = router;
