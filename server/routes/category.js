const express = require("express");
const CategoryController = require("../controllers/category");
const router = express.Router();

router.get("/", CategoryController.getCategory);
router.post("/", CategoryController.createCategory);

module.exports = router;
