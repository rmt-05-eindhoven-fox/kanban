const express = require("express")
const router = express.Router()
const OrganizationController = require('../controllers/OrganizationController')
const authentication = require("../middlewares/authentication")

router.use(authentication)
router.get("/", OrganizationController.readOrg)
router.post("/", OrganizationController.createOrg)

module.exports = router