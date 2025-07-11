const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  barcode: { type: String, required: true, unique: true },
  name: String,
  price: Number,
  description: String
});

module.exports = mongoose.model('Product', productSchema);
