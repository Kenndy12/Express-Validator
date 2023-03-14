const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
	getProducts,
	getProduct,
	updateProduct,
	createProduct,
	deleteProduct,
} = require("../controller/productController");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.put(
	"/:id",
	body("name").notEmpty().optional(),
	body("description")
		.isLength({ min: 20 })
		.withMessage("Minimal 20 characters on description")
		.optional(),
	body("price").isFloat().optional(),
	updateProduct
);
router.post(
	"/",
	body("name").notEmpty(),
	body("description")
		.isLength({ min: 20 })
		.withMessage("Minimal 20 characters on description")
		.optional(),
	body("price").notEmpty().isFloat(),
	createProduct
);

router.delete("/:id", deleteProduct);

module.exports = router;
