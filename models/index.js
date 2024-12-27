const mongoose = require('mongoose');
const dbConfig = require('../config/db.config.js');

// Database Connection
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

const db = {};
db.mongoose = mongoose;
db.Customer = require('./customer.model.js');
db.Product = require('./product.model.js');
db.Batch = require('./batch.model.js');
db.Invoice = require('./invoice.model.js');

module.exports = db;
