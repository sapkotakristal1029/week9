const express = require("express");
const server = express();
const mongoose = require("mongoose");
const createProductRoute = require("./routes/add");
const getProductsRoute = require("./routes/read");
const updateProductRoute = require("./routes/remove");
const deleteProductRoute = require("./routes/update");

const cors = require("cors");

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/SFweek9");
    console.log("DB connected");
  } catch (error) {
    console.log("DB not connected", error);
  }
}

connectDB();

server.use(cors());
server.use(express.json());

server.use(createProductRoute);
server.use(getProductsRoute);
server.use(updateProductRoute);
server.use(deleteProductRoute);

server.listen(8000, () => {
  console.log("Server is running");
});
