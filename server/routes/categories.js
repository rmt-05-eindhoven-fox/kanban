const express = require("express")
const router = express.Router()
const CategoryController = require("../controllers/CategoryController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.use(authentication)
router.get("/", CategoryController.getCategory)
router.post("/", CategoryController.postCategory)
router.delete("/:id", CategoryController.deleteCategory)

module.exports = router