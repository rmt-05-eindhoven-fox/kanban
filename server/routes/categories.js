const router = require('express').Router()
const ControllerCategories = require('../controller/ControllerCategories')

router.post('/', ControllerCategories.addCategories)

module.exports = router