const CategoryController = require('../controllers.js/categoryController');

const router = require('express').Router();

router.get('/', CategoryController.findAll);
router.post('/add', CategoryController.add);

module.exports = router;