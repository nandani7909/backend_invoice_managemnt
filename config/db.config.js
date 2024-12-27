const mongoose = require('mongoose');

const dbConfig = {
  url: 'mongodb://localhost:27017/invoice-management',
};

mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit();
  });

module.exports = mongoose;
