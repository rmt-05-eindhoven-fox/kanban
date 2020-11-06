const router = require('express').Router()
const OrganizationController = require('../controllers/organizationController')
const { adminAuthorization, memberAuthorization } = require('../middlewares/organizationAuthorization')

router.get('/', OrganizationController.findAll)
router.post('/', OrganizationController.create)

router.put('/:id', adminAuthorization, OrganizationController.edit)
router.delete('/:id', adminAuthorization, OrganizationController.delete)

router.get('/:id/members', memberAuthorization, OrganizationController.showMember)
router.post('/:id/members', adminAuthorization, OrganizationController.invite)

router.patch('/:id/members/:UserId', adminAuthorization, OrganizationController.changeRole)
router.delete('/:id/members/:UserId', memberAuthorization, OrganizationController.leave)

module.exports = router