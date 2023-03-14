const express = require("express");
const router = express.Router();

const {
	getSellers,
	getSeller,
	updateSeller,
	createSeller,
	deleteSeller,
} = require("../controller/sellerController");

const {
	checkUpdateSeller,
	checkPostSeller,
} = require("../middleware/validator");

router.get("/", getSellers);
router.get("/:sellerId", getSeller);
router.put("/:sellerId", checkUpdateSeller, updateSeller);
router.post("/", checkPostSeller, createSeller);
router.delete("/:sellerId", deleteSeller);

module.exports = router;
