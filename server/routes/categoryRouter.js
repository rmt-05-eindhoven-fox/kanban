const router = require('express').Router();
const CategoryController = require('../controllers/CategoryController');

router.get('/', CategoryController.findAll);
router.post('/', CategoryController.create);
router.patch('/:categoryId', CategoryController.patch);
router.delete('/:categoryId', CategoryController.delete);
router.use('/:categoryId', (req, res, next) => {
  req.user.categoryId = +req.params.categoryId;
  next();
})

module.exports = router;