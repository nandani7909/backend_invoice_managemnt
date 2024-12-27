const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product schema for invoices
const productSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  batch: { type: String },
  quantity: { type: Number },
  discount: { type: Number },
  tax: { type: Number },
  grandTotal: { type: Number },
});

// Invoice schema
const invoiceSchema = new Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  invoiceType: { type: String, enum: ['sale', 'return'], required: true },
  invoiceNumber: { type: String, unique: true },
  salesReturnNumber: { type: String, default: null },
  date: { type: Date, required: true },
  products: [productSchema],
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
