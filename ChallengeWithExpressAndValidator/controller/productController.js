let products = require("../data/product.json");
const { writeDataToFile } = require("../util");
const { validationResult } = require("express-validator");

const getProducts = (_, res) => {
	res.json(products);
};

const getProduct = (req, res) => {
	const { id } = req.params;
	const product = products.find((product) => product.id === id);
	res.json(product);
};

const updateProduct = (req, res) => {
	const { id } = req.params;
	const product = products.find((product) => product.id === id);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const updateBody = {
		name: req.body.name || product.name,
		description: req.body.description || product.description,
		price: req.body.price || product.price,
	};

	const newProduct = { ...product, ...updateBody };

	products = products.map((product) =>
		product.id === id ? newProduct : product
	);
	writeDataToFile("./product.json", products);
	res.json({ message: "Successfully updated", data: products });
};

const createProduct = (req, res) => {
	const { id, name, description, price } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const newPost = {
		id: (products.length + 1).toString(),
		name,
		description,
		price,
	};
	products.push(newPost);
	writeDataToFile("./product.json", products);
	res.json({ message: "Successfully created", data: products });
};

const deleteProduct = (req, res) => {
	const { id } = req.params;
	console.log(id);
	const deletedProducts = products.filter((product) => product.id !== id);

	res.json({
		message: `Successfully deleted product ${id}`,
		data: deletedProducts,
	});
};

module.exports = {
	getProducts,
	getProduct,
	updateProduct,
	createProduct,
	deleteProduct,
};
