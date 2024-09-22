const express = require("express");
const router = express.Router();
const productModel = require("../model/productModel");

// Controller to update a product by ID
const updateProductController = async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedProduct) {
      res.send({
        status: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } else {
      res.send({ status: false, message: "Product not found" });
    }
  } catch (error) {
    res.send({ status: false, message: "Error updating product" });
  }
};

// Route to update a product by ID
router.patch("/products/update/:id", updateProductController);

module.exports = router;
