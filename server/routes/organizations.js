const express = require('express');
const router = express.Router();
const controller = require("../controllers/OrganizationController")
const authorization = require("../middlewares/authorization")
const authentication = require("../middlewares/authentication")


router.use(authentication)
router.post('/', controller.Create)
router.get('/', controller.GetOrganization)
router.get('/:id', authorization,controller.GetOrganizationById)
router.put('/:id', authorization, controller.Update)
router.delete('/:id', authorization, controller.Delete)
// router.patch('/:id', authorization, controller.UpdateStatus)

module.exports = router;
