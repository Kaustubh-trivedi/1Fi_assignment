const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({

  color: {
    type: String,
    required: true
  },

  storage: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  images: [String]

});

const productSchema = new mongoose.Schema({

  name: String,

  slug: {
    type: String,
    unique: true
  },

  description: String,

  variants: [variantSchema]

});

module.exports = mongoose.model("Product", productSchema);