const { Category } = require("../models");

class CategoryController {
  static async getCategory(req, res, next) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async createCategory(req, res, next) {
    const { name } = req.body;
    try {
      const payload = {
        name,
      };
      const newCategory = await Category.create(payload);
      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
