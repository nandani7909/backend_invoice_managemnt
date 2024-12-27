const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const batchSchema = new Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  batchCode: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  expiryDate: { type: Date, required: true }
});

const Batch = mongoose.model('Batch', batchSchema);
module.exports = Batch;
