const express = require('express');
const router = express.Router();
const controller = require("../controllers/TaskController")
const authorization = require("../middlewares/authorization")
const authentication = require("../middlewares/authentication")


router.use(authentication)
router.post('/', authorization,controller.Create)
router.get('/', authorization,controller.GetTask)
router.get('/:id', authorization,controller.GetTaskById)
router.put('/:id', authorization, controller.Update)
router.delete('/:id', authorization, controller.Delete)
router.patch('/:id', authorization, controller.UpdateStatus)
router.get('/organization/:organization_id', authorization,controller.GetTaskByOrganizationId)


module.exports = router;
