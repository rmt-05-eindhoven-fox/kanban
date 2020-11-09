const router = require("express").Router()
const CategoryController = require("../controllers/category.controller")

router.post("/", CategoryController.create)

module.exports = router