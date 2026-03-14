const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", productRoutes);

app.use(errorMiddleware);

module.exports = app;