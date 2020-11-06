const { Category } = require("../models/index")

class CategoryController {

    static async create(req, res, next) {
        try {
            const { name } = req.body
            const category = await Category.create({ name })
            res.status(201).json(category)
        } catch (err) {
            next(err)
        }
    }

}

module.exports = CategoryController