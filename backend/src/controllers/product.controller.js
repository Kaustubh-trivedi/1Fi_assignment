const ProductService = require("../services/product.service");

exports.getProducts = async (req, res, next) => {

  try {

    const products = await ProductService.getProducts();

    res.json(products);

  } catch (error) {

    next(error);

  }

};

exports.getProduct = async (req, res, next) => {

  try {

    const data = await ProductService.getProductBySlug(
      req.params.slug
    );

    if (!data)
      return res.status(404).json({
        message: "Product not found"
      });

    res.json(data);

  } catch (error) {

    next(error);

  }

};