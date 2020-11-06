const router = require('express').Router()
const CategoryController = require('../controllers/categoryController')
const categoryAuthorization = require('../middlewares/categoryAuthorization')

router.get('/', CategoryController.findAll)

router.post('/', categoryAuthorization, CategoryController.create)

router.patch('/:id', categoryAuthorization, CategoryController.editName)
router.delete('/:id', categoryAuthorization, CategoryController.delete)

router.patch('/:id/position', categoryAuthorization, CategoryController.editPosition)

module.exports = router