const Product = require('../models/product.model');

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: err,
    });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({ code: req.body.code });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: 'Product with this code already exists',
      });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: product,
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: err,
    });
  }
};
