// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const productSchema = new Schema({
  platform: String,
  product: String,
  title: String,
  image: String,
  rating: String,
  price: String,
  offer_price: String,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
