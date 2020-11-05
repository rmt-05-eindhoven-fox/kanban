const router = require('express').Router()
const TagController = require('../controllers/tagController')
const tagAuthorization = require('../middlewares/tagAuthorization')

router.get('/', TagController.findAll)
router.post('/', TagController.create)

router.put('/:id', tagAuthorization, TagController.edit)
router.delete('/:id', tagAuthorization, TagController.delete)

module.exports = router