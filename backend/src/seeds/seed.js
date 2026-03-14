require("dotenv").config();

const mongoose = require("mongoose");

const Product = require("../models/product.model");

const EmiPlan = require("../models/emiPlan.model");

const products = require("./products.seed");

const emiPlans = require("./emi.seed");

async function seed() {

  await mongoose.connect(process.env.MONGO_URI);

  await Product.deleteMany();

  await EmiPlan.deleteMany();

  await Product.insertMany(products);

  await EmiPlan.insertMany(emiPlans);

  console.log("Seed data inserted");

  process.exit();

}

seed();