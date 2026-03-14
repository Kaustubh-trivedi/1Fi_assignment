// const Product = require("../models/product.model");
// const EmiPlan = require("../models/emiPlan.model");
// const calculateEmi = require("../utils/emiCalculator");

// class ProductService {

//   static async getProducts() {

//     const products = await Product.find().select(
//       "name slug variants.price variants.images"
//     );

//     return products;

//   }

//   static async getProductBySlug(slug) {

//     const product = await Product.findOne({ slug });

//     if (!product) return null;

//     const plans = await EmiPlan.find();

//     const price = product.variants?.[0]?.price || 0;

//     const emiPlans = plans.map(plan => ({

//       _id: plan._id,

//       months: plan.months,

//       interestRate: plan.interestRate,

//       cashback: plan.cashback,

//       monthlyAmount: calculateEmi(
//         price,
//         plan.months,
//         plan.interestRate
//       )

//     }));

//     return {
//       product,
//       emiPlans
//     };

//   }

// }

// module.exports = ProductService;

const Product = require("../models/product.model");
const EmiPlan = require("../models/emiPlan.model");

class ProductService {

  static async getProducts() {

    return Product.find().select(
      "name slug variants"
    );

  }

  static async getProductBySlug(slug) {

    const product = await Product.findOne({ slug });

    const emiPlans = await EmiPlan.find();

    return {
      product,
      emiPlans
    };

  }

}

module.exports = ProductService;