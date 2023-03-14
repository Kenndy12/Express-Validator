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
const {
	checkUpdateProduct,
	checkPostProduct,
} = require("../middleware/validator");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", checkUpdateProduct, updateProduct);
router.post("/", checkPostProduct, createProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
