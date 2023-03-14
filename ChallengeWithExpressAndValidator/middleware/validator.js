const { body, validationResult, check } = require("express-validator");
const products = require("../data/product.json");

exports.checkUpdateProduct = [
	body("name").notEmpty().optional(),
	body("description")
		.isLength({ min: 20 })
		.withMessage("Minimal 20 characters on description")
		.optional(),
	body("price").isFloat().optional(),
	(req, res, next) => {
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.mapped() });
		}
		return next();
	},
];

exports.checkPostProduct = [
	body("name").notEmpty(),
	body("description")
		.isLength({ min: 20 })
		.withMessage("Minimal 20 characters on description"),
	body("price").notEmpty().isFloat(),
	(req, res, next) => {
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.mapped() });
		}
		return next();
	},
];

exports.checkUpdateSeller = [
	body("sellerId").isString().optional(),
	body("address").isLength({ min: 5 }).optional(),
	body("merchandise").isArray().optional(),
	(req, res, next) => {
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.mapped() });
		}
		return next();
	},
];

exports.checkPostSeller = [
	body("sellerId").isString(),
	body("name").notEmpty(),
	body("address").notEmpty(),
	body("merchandise")
		.isArray()
		.custom((value) => {
			value.forEach((el) => {
				if (isNaN(el)) {
					throw new Error("All elements must be a number");
				}
				product = products.find((product) => product.id === el.toString());
				if (!product) {
					throw new Error("Product does not exist");
				}
			});
			return true;
		}),
	(req, res, next) => {
		const errors = validationResult(req);
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.mapped() });
		}
		return next();
	},
];
