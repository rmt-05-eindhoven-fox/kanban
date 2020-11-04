const router = require('express').Router()
const OrganizationController = require('../controllers/organizationController')

router.get('/', OrganizationController.findAll)

module.exports = router