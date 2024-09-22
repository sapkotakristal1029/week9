const express = require("express");
const router = express.Router();
const productModel = require("../model/productModel");
// Controller to delete a product by ID
const deleteProductController = async (req, res) => {
  try {
    const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
    if (deletedProduct) {
      res.send({ status: true, message: "Product deleted successfully" });
    } else {
      res.send({ status: false, message: "Product not found" });
    }
  } catch (error) {
    res.send({ status: false, message: "Error deleting product" });
  }
};

// Route to delete a product by ID
router.delete("/products/delete/:id", deleteProductController);

module.exports = router;
