const express = require("express");
const router = express.Router();
const productModel = require("../model/productModel");

// Controller to get all products
const getProductsController = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.send({ status: true, data: products });
  } catch (error) {
    res.send({ status: false, message: "Error fetching products" });
  }
};

// Route to get all products
router.get("/products", getProductsController);

module.exports = router;
