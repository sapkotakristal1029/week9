const express = require("express");
const router = express.Router();
const productModel = require("../model/productModel");
// Service to create a new product
const createProductDBService = async (productDetails) => {
  console.log(productDetails);
  try {
    const productModelData = new productModel({
      name: productDetails.name,
      description: productDetails.description,
      price: productDetails.price,
      units: productDetails.units,
    });
    await productModelData.save();
    return true;
  } catch (error) {
    return false;
  }
};

// Controller to handle POST request to create user
const createProductControllerFn = async (req, res) => {
  const status = await createProductDBService(req.body);
  if (status) {
    res.send({ status: true, message: "Product created successfully" });
  } else {
    res.send({ status: false, message: "Error creating Product" });
  }
};

// Route to create a new user
router.post("/products/create", createProductControllerFn);

module.exports = router;
