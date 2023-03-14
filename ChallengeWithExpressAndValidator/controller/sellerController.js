let sellers = require("../data/seller.json");
const { validationResult } = require("express-validator");

const getSellers = (_, res) => {
	res.json(sellers);
};

const getSeller = (req, res) => {
	const { sellerId } = req.params;
	const seller = sellers.find((seller) => seller.sellerId === sellerId);
	res.json(seller);
};

const updateSeller = (req, res) => {
	const { sellerId } = req.params;
	const seller = sellers.find((seller) => seller.sellerId === sellerId);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const body = {
		name: req.body.name || seller.name,
		address: req.body.address || seller.address,
		merchandise: req.body.merchanise || seller.merchandise,
	};

	const newSeller = { ...seller, ...body };

	sellers = sellers.map((seller) =>
		seller.sellerId === sellerId ? newSeller : seller
	);
	res.json({ message: "Successfully updated", data: sellers });
};

const createSeller = (req, res) => {
	const { sellerId, name, address, merchandise } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	const newSeller = {
		sellerId: (sellerId || sellers.length + 1).toString(),
		name,
		address,
		merchandise,
	};
	sellers.push(newSeller);
	res.json({ message: "Successfully created", data: sellers });
};

const deleteSeller = (req, res) => {
	const { sellerId } = req.params;
	console.log(sellerId);
	const deletedSeller = sellers.filter(
		(seller) => seller.sellerId !== sellerId
	);

	res.json({
		message: `Successfully deleted seller ${sellerId}`,
		data: deletedSeller,
	});
};

module.exports = {
	getSellers,
	getSeller,
	updateSeller,
	createSeller,
	deleteSeller,
};
