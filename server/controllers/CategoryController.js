const { Category } = require("../models");

class CategoryController {
	static addCategory(req, res, next) {
		let params = {
			name: req.body.name,
		};
		Category.create(params)
			.then((data) => {
				return res.status(201).json(data);
			})
			.catch((err) => {
				return next(err);
			});
	}
}

module.exports = CategoryController;
