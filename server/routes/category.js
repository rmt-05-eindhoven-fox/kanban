const router = require("express").Router();

const CategoryController = require("../controllers/category");

router.get("/", CategoryController.showCategory);
router.post("/", CategoryController.addCategory);

module.exports = router;
