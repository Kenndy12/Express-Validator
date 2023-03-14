const express = require("express");
const cors = require("cors");
const productRouter = require("./router/productRoutes");
const sellerRouter = require("./router/sellerRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRouter);
app.use("/api/seller", sellerRouter);

app.listen(8000, () => {
	console.log("Server has started at port 8000");
});
