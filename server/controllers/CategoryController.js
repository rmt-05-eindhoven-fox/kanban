const { Category, Task } = require('../models');

class CategoryController {
  static async findAll(req, res, next) {
    const ProjectId = req.user.projectId;
    try {
      const categories = await Category.findAll({
        where: {
          ProjectId
        },
        include: Task
      });

      res.status(200).json(categories);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    const ProjectId = req.user.projectId;
    const categoryName = req.body.categoryName;
    try {
      const newCategory = await Category.create({
        name: categoryName,
        ProjectId
      });

      res.status(201).json(newCategory);
    } catch (err) {
      next(err);
    }
  }

  static async patch(req, res, next) {
    const categoryId = +req.params.categoryId;
    const { categoryName } = req.body;
    try {
      const updatedCategory = await Category.update({
        name: categoryName
      }, {
        where: {
          id: categoryId
        },
        returning: true
      });

      if(updatedCategory[1].length > 0) {
        res.status(200).json(updatedCategory[1][0]);
      } else {
        throw {
          name: 'NotFound'
        };
      }
    } catch (err) {
      next(err);      
    }
  }

  static async delete(req, res, next) {
    const categoryId = +req.params.categoryId;
    try {
      const deletedCategory = await Category.destroy({
        where: {
          id: categoryId
        }
      });

      if(deletedCategory) {
        res.status(200).json({
          message: 'Category success to delete'
        });
      } else {
        throw {
          name: 'NotFound'
        };
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CategoryController;