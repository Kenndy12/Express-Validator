const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const products = require("../data/product.json");

const {
	getSellers,
	getSeller,
	updateSeller,
	createSeller,
	deleteSeller,
} = require("../controller/sellerController");

router.get("/", getSellers);
router.get("/:sellerId", getSeller);
router.put(
	"/:sellerId",
	body("sellerId").isString().optional(),
	body("address").isLength({ min: 5 }).optional(),
	body("merchandise").isArray().optional(),
	updateSeller
);
router.post(
	"/",
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
	createSeller
);
router.delete("/:sellerId", deleteSeller);

module.exports = router;
