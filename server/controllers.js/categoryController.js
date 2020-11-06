const { Category } = require("../models");

class CategoryController {

  static findAll(req, res) {
    Category.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }

  static add(req, res) {
    const obj = {
      name: req.body.name
    }
    Category.create(obj)
     .then(data => {
       res.status(201).json(data);
     })
     .catch(err => {
       res.status(500).json(err);
     })
  }
}

module.exports = CategoryController