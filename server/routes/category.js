const router = require("express").Router();

const CategoryController = require("../controllers/category");
const { authorizationCategory } = require("../middlewares/authorization");

router.get("/", CategoryController.showCategory);
router.post("/", CategoryController.addCategory);
router.delete("/:id", authorizationCategory, CategoryController.deleteCategory);
router.patch(
  "/:id",
  authorizationCategory,
  CategoryController.changeCategoryTitle
);

module.exports = router;
