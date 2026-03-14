const express = require("express");
const router = express.Router();

const productController = require(
  "../controllers/product.controller"
);

router.get("/products", productController.getProducts);

router.get(
  "/products/:slug",
  productController.getProduct
);

module.exports = router;