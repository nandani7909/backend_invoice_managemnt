const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Import routes
const invoiceRoutes = require('./routes/invoice.routes');
const customerRoutes = require('./routes/customer.routes');
const productRoutes = require('./routes/product.routes');
const batchRoutes = require('./routes/batch.routes');

// Use routes
app.use('/api', invoiceRoutes);
app.use('/api', customerRoutes);
app.use('/api', productRoutes);
app.use('/api', batchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
