const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')

router.get('/:organizationId', CategoryController.findAll)
router.post('/:organizationId', CategoryController.create)

router.patch('/:id', CategoryController.editName)
router.delete('/:id', CategoryController.delete)

module.exports = router