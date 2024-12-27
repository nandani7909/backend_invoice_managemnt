const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String },
  price: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
