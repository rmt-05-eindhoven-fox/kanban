const { Category, Task } = require("../models");

class CategoryController {
  static async showCategory(req, res, next) {
    try {
      console.log(`==== Fetching Category ====`);
      const categories = await Category.findAll();
      res.status(200).json({
        categories,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      console.log(`==== Adding Category ====`);
      const title = req.body.title;
      const UserId = req.User.id;

      const payload = {
        title,
        UserId,
      };
      const category = await Category.create(payload);
      res.status(201).json({
        category,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      console.log(`==== Deleting the task that related to category ====`);
      const CategoryId = req.params.id;

      const tasks = await Task.destroy({
        where: {
          CategoryId: CategoryId,
        },
      });
      console.log(`==== Deleting Category ====`);
      const category = await Category.destroy({
        where: {
          id: CategoryId,
        },
      });

      res.status(200).json({
        category,
      });
    } catch (err) {
      next(err);
    }
  }

  static async changeCategoryTitle(req, res, next) {
    try {
      console.log(`==== Changing Category Title ====`);
      const newData = {
        title: req.body.title,
      };

      const category = await Category.update(newData, {
        where: {
          id: req.params.id,
        },
      });

      if (!category) {
        throw { messsage: `Category not found`, status: 404 };
      }

      res.status(200).json({
        category,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;
