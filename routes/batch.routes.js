const express = require('express');
const router = express.Router();
const batchController = require('../controllers/batch.controller');

router.get('/', batchController.getAllBatches);  // Get all batches
router.post('/', batchController.createBatch);   // Create a new batch
router.get('/product/:productId', batchController.getBatchesByProduct);  // Fetch batches by product

module.exports = router;
